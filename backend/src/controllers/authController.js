import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { tokenGeneration } from "../lib/token.js";

export const signup=async (req, res)=>{
    const {userName, email, password}=req.body;
    try{
        if(!userName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password.length<4){
            return res.status(400).json({message:"Password must be at least 8 characters"})
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hasedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            userName,
            email,      
            password:hasedPassword,
        });
        await newUser.save(); 
        if(newUser){
            tokenGeneration(newUser._id,res);
            res.status(201).json({message:"User created successfully", user:newUser});
        }
    }
    catch(error){
        console.log("Error in signup:", error.message);
        res.status(500).json({message:"Internal server error"});
    }
};

export const login = async (req, res) => {
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email"});
        }
        const ispassword=await bcrypt.compare(password,user.password);
        if(!ispassword){
            return res.status(400).json({message:"Invalid password"});
        }
        tokenGeneration(user._id,res);
        res.status(200).json({message:"Login successful", user});
    }
    catch(error){
        console.log("Error in login:", error.message);
        return res.status(500).json({message:"Internal server error"});
    }
};  

export const logout = (req, res) => {
    try{
        res.cookie('token','',{maxAge:0});
        res.status(200).json({message:"Logout successful"});
    }
    catch(error){
        console.log("Error in logout:", error.message);
        res.status(500).json({message:"Internal server error"});
    }
}   

export const editProfile=async(req,res)=>{
    try{
        const {profilepic}=req.body;
        const userId=req.user._id;
        if(!profilepic){
            return res.status(400).json({message:"Profile picture is required"});
        }
        const uploadImage=await cloudinary.uploader.upload(profilepic);
        const updatedUser=await User.findByIdAndUpdate(userId,{
        profilepic:uploadImage.secure_url,
        },{new:true})
        res.status(200).json({message:"Profile updated successfully", user:updatedUser});
    }
    catch(error){
        console.log("Error in updating profile:", error.message);
        res.status(500).json({message:"Internal server error"});
    }
}