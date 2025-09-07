import httpStatus from "http-status";
import {User} from "../models/user.model.js";
import bcrypt, {hash} from "bcrypt";
import crypto from "crypto";
import { Meeting } from "../models/meeting.model.js";
import e from "express";


const login = async(req,res) => {
   const {username,password} = req.body;
   if(!username || !password){
      return res.status(400).json({message: "please provide"})
   }
   try {
      const user = await User.findOne({username});
      if(!user){
         return res.status(httpStatus.NOT_FOUND).json({message:"User not found"});
      }
     
   const isMatch = await bcrypt.compare(password,user.password);
   if(!isMatch){
      return res.status(httpStatus.UNAUTHORIZED).json({message:"invalid password"})
   } 
         const token = crypto.randomBytes(20).toString("hex");
         user.token = token;
         await user.save();
         return  res.status(httpStatus.OK).json({token:token})
      }
    catch (e) {
      console.error("login error:",e);
      return res.status(500).json({message:"something went wrong"})
   }
}

const register = async(req,res) =>{
   const{name,username,password} = req.body;
   
   

   try{
     const existingUser = await User.findOne({username});
     if(existingUser){
        return res.status(httpStatus.FOUND).json({message:"User already exists"})
     }
     const hashedPassword = await bcrypt.hash(password,10);
   
     const newUser = new User({
      name:name,
      username: username,
      password:hashedPassword
     });
     await newUser.save();
     res.status(httpStatus.CREATED).json({message:"user Registerd successfully"})
   }catch(e){
    res.json({message:`Something went wrong $(e)`})
   }
}
const getUserHistory =async (req, res) =>{
   const {token} = req.query;


   try {
      const user = await User.findOne({token:token});
      const meetings = await Meeting.find({user_id:user.username})
      res.json(meetings)
   } catch (error) {
      res.json({message:`something went wrong ${error}`})
   }
}

const addToHistory = async (req, res) => {
    const { token, meetingCode } = req.body;  // Changed from meeting_code to meetingCode
    
    if (!token || !meetingCode) {
        return res.status(400).json({ message: "Token and meeting code are required" });
    }

    try {
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meetingCode  // This matches your schema
        });

        await newMeeting.save();
        return res.status(201).json({ message: "Meeting added to history" });
    } catch (error) {
        console.error("Add to history error:", error);
        return res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
};
export {login, register,getUserHistory,addToHistory};