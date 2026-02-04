import jwt from "jsonwebtoken"
import { redisClint } from "../index.js";
import { User } from "../models/user.js";

export const isAuth = async (req,res,next)=>{
    try {
const token = req.cookie.accessToken;
if(!token){
    return res.status(400).json({
        message:"please Login - no token"
    })
}
const decodedData=jwt.verify(token,process.env.JWT_SECRET)
if(!decodedData){
    return res.status(400).json({
        message:"token expired"
    })
}
const cacheuser = await redisClint.get(`user:${decodedData.id}`);
if(cacheuser){
    req.user = JSON.parse(cacheuser);
    return next()
}
const user = await User.findById(decodedData.id).select("-password")

if(!user){
    return res.status(400).json({
        message:"no user with this id"
    })
}
await redisClint.setEx(`user:${user._id}`,3600,JSON.stringify(user))
req.user=user;
next()
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}