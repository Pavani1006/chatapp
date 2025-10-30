import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getAllUsers, sendMessage } from "../controllers/messageController";

const route = express.Router();

route.post("/users", authMiddleware, getAllUsers);
route.get("/getmessages/:_id", authMiddleware, getAllMessages);
route.post("/sendmessage/:_id", authMiddleware, sendMessage);

export default route;