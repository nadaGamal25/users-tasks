import { User } from "../../../database/models/user.model.js";
import jwt from 'jsonwebtoken'
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import bcrypt from 'bcrypt'

import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.SECRET_KEY;

//Sign Up
const signup=catchError(async(req,res)=>{
    req.body.password=bcrypt.hashSync(req.body.password,8)
    let user =await User.insertMany(req.body)
      user[0].password = undefined;

    res.status(201).json({message:'success',user})
})

//sign in
const signin=catchError(async(req,res,next)=>{
    let user = await User.findOne({name: req.body.username})
    if(!user || !bcrypt.compareSync(req.body.password,user.password))
        return next(new AppError('Invalid username or password',400))
    jwt.sign({userId:user._id,role:'user'},secretKey,async(err,token)=>{
        if(err)return next(new AppError('Something went wrong',500))
            res.status(200).json({message:'Login successful',token:token})
    })
    
})

export{
    signup,signin
}