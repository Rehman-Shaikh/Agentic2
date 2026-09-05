import redis from "../../shared/redis/redis.js";

const protect = async (req, res, next) => {
    try {
        const sessionId = req.cookies?.session /// because cookie-parser middleware is used
        if(!sessionId){
            return res.status(400).json({ message: "Unauthorized"})
        }

        const session = await redis.get(`session-${sessionId}`);
        console.log("Redis session data:", session);
        if(!session){
            return res.status(400).json({ message: "session expired"})
        }

        req.user = JSON.parse(session);
        console.log("Inside protect middleware in gateway");
        next();
    }catch (error) {
        return res.status(500). json({ message: `protect error ${error}`})
    }
}

export default protect