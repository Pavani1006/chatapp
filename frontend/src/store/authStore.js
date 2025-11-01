import {create} from "zustand";
import axiosInstance from "../lib/axios";

export const authStore=create((set)=>({
    loggedUser:null,
    signup:async(data)=>{
        try{
            const response=await axiosInstance.post("/auth/signup",data);
            set({loggedUser:response.data.user});
        }catch(error){
            console.error("Signup failed:",error);
        }
    }
}));