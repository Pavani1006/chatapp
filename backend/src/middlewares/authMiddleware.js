import jwt from "jsonwebtoken";
import {User} from "../model/userModel.js";

// To protect routes that require authentication
export const authMiddleware=async(req,res,next)=>{
    try{
        const {token}=req.cookies.token;
        if(!token){
            return res.status(400).json({message:"Token is required"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"Unauthorized, invalid token"});
        }
        const user=await User.findById(decoded.id).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        req.user=user;
        next();
    }
    catch(error){
        console.log("Error in auth middleware:", error.message);
        res.status(500).json({message:"Internal server error"});
    }
};