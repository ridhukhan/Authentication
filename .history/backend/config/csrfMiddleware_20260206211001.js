import crypto from "crypto"
import { redisClint } from "..";

export const genarateCSRFToken = async(userId,res)=>{
    const csrfToken=crypto.randomBytes(32).toString("hex");
    const csrfKey =`csrf:${userId}`;

    await redisClint.setEx(csrfKey,3600,csrfToken)
    res.cookie("csrfToken",csrfToken,{
        httpOnly:false,
        secure:true,
        samesite:"none",
        maxAge:60*60*1000
    })
    return csrfToken
}

export const verifyCSRFToken=async(req,res,next)=>{
    try {
        if(req.method==="GET"){
            return next()
        }

        const userId = req.user?._id;
        if(!userId){
            return res.status(401).json({
                message:"User not authenticated",
            })

        }
        const clientToken =
        req.headers["x-csrf-token"] || 
        req.headers["x-xsrf-token"] || 
        req.headers["csrf-token"];
    } catch (error) {
        
    }
}