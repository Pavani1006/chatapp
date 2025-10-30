import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getAllUsers } from "../controllers/messageController";

const route = express.Router();

route.post("/users", authMiddleware, getAllUsers);
route.get("/getmessages/:_id", authMiddleware, getAllMessages);


export default route;