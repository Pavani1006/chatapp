import { User } from "../model/userModel.js";
export const signup=async (req, res)=>{
    const {userName, email, password}=req.body;
    try{
        if(!userName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password.length<8){
            return res.staus(400).json({message:"Password must be at least 8 characters"})
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
        res.status(201).json({message:"User created successfully", user:newUser});
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
};

export const login = (req, res) => {
  res.send('Login route');
};  

export const logout = (req, res) => {
  res.send('Logout route');
}   