import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDb from "./config/db.js";
import router from "./routes/chat.routes.js"

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => {
    res.json({ message: "hello from chat" })
})

app.listen(port, () =>{
    connectDb();
    console.log(`Chat service started at http://localhost:${port}`);
})