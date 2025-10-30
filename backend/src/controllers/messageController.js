import {User} from "../model/userModel.js";
import {Message} from "../model/messageModel.js";

export const getAllUsers=async(req,res)=>{
    try{
        const loggedUserId=req.user._id; 
        const users=await User.find({_id:{$ne:loggedUserId}}).select("-password");

        if (users) {
        res.status(200).json({users});
        }
    } catch (error) {
    console.log("Error in Fetching all users", error.message);
    res.status(500).json({ message: "Internal Server Error." });
    }
};

export const getAllMessages=async(req,res)=>{
    const receiverId=req.params._id;
    const senderId=req.user._id;
    try{
        const messages=await Message.find({
            $or:[
                {senderId:senderId,receiverId:receiverId},
                {senderId:receiverId,receiverId:senderId}
            ]
        })
        res.status(200).json({messages});
    }catch(error){
        console.log("Error in fetching messages:",error.message);
        res.status(400).json({message:"Invalid User Id"});
    }
};

