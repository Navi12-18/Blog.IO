import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";
import fetchUser from "../middleware/fetchUser.js";
const router = express.Router();
const secret = "svnhovg9gtrvervg45y4b4"

router.post("/register", async(req,res)=>{
    try{
        const {username, email, password} = req.body;
        let success = false;
        if(!username && !email && !password){
            return res.json(404).json({message : "Enter the credentials"});
        }

        let user = await authModel.findOne({email : req.body.email});
        if(user){
            return res.json(404).json({message : "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = await authModel.create({
            username : username,
            email : email,
            password : hashedPassword
        })

        if(user){
            const data = {
                user : {
                    id : user.id
                }
            }

            success = true;
            const authToken = jwt.sign(data, secret);
            
            return res.status(200).json({success, authToken});
        }else{
            return res.status(404).json({message : "Internal Error"});
        }      
    }catch(error){
        console.error(error);
        return res.status(404).json({message : "error"});
    }
});

router.post("/login", async(req,res)=>{
    try {
        const {email,password} = req.body; 
        let success = false;
        if(!email && !password){
            return res.json(404).json({message : "Enter the credentials correctly"});
        }

        let user = await authModel.findOne({email : req.body.email});

            const passwordCom = await bcrypt.compare(password, user.password);
            if(passwordCom){
                const data = {
                    user : {
                        id : user.id
                    }
                }

                const authToken = jwt.sign(data, secret);
                success = true;
                return res.json({success,authToken});
            }
    } catch (error) {
        console.error(error);
        return res.status(404).json({message : "error"});
    }
});

router.post('/getuser',fetchUser,async (req, res) => {

    try {
      const userId = req.user.id;
      const user = await authModel.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

export default router;