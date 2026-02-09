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
        if(!clientToken){
            res.status(403).json({
                message:"CSRF Token missing. please refresh the page",
            code:"CSRF_TOKEN_MISSING",
            
            })
        }
        const csrfKey=`csrf:${userId}`;

        const storedToken=await redisClint.get(csrfKey)
        if(!storedToken){
            res.status(403).json({
                message:"CSRF Token Expired. please try again",
            code:"CSRF_TOKEN_EXPIRED",
            
            })
        }

        if(storedToken !== clientToken){
               res.status(403).json({
                message:"Invalid csrf  Token . please refresh the page",
            code:"CSRF_TOKEN_INVALID",
            
            })
        }

        next()
        console.log("csrf verification error",error)

    } catch (error) {
   
    res.status(403).json({
                message:"Invalid csrf  Token . please refresh the page",
            code:"CSRF_TOKEN_INVALID",
            
            })
    }
}