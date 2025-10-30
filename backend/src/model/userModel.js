import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,    
    },
    password:{
        type:String,
        required:true,
        minlength:4,
    },
    profilepic:{
        type:String,
        default:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },                  
},{timestamps:true});

export const User=mongoose.model("User",userSchema);    
