import { getAuth } from "firebase-admin/auth";
import User from "../models/user.model.js";
import { app } from "../config/firebase.js";
import redis from "../../../shared/redis/redis.js";
import crypto from "crypto";

export const login = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = await getAuth(app).verifyIdToken(token);

    let user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture, // spelling fixed
      });
    }

    const sessionId = crypto.randomUUID();

    await redis.set(
      `session-${sessionId}`, // consistent key
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      }),
      "EX",
      60 * 60 * 24 * 7 // 7 days
    );

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in prod
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `login failed: ${error.message}` });
  }
};


export const logOut = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;
    if (sessionId) {
      await redis.del(`session-${sessionId}`); // fixed key
    }

    res.clearCookie("session");
    return res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    return res.status(500).json({ message: `logout error ${error.message}` });
  }
};

