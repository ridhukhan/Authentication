import jwt from "jsonwebtoken"
import { redisClint } from "../index.js";
import { genarateCSRFToken, revokeCSRFTOKEN } from "./csrfMiddleware.js";
import crypto from "crypto"

const isProd = process.env.NODE_ENV === "production";

export const genarateToken = async (id,res)=>{
const sessionId = crypto.randomBytes(16).toString("hex")

    const accessToken = jwt.sign({id,sessionId},process.env.JWT_SECRET,{
        expiresIn:"15m",
    });
    const refreshToken =jwt.sign({id,sessionId},process.env.REFRESH_SECRET,{
        expiresIn:"7d",
    });
    const refreshTokenkey=`refresh_token:${id}`;
    const activeSessionKey=`active_session:${id}`;
    const sessionData=`session:${sessionId}`
    await redisClint.setEx(refreshTokenkey,16*24*60*60,refreshToken);
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:isProd,
        sameSite:isProd?"none":"lax",
        maxAge:15*60*1000
    });
    res.cookie("refreshToken",refreshToken,{
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
        sameSite:isProd?"none":"lax",
        secure:isProd
    })

    const csrfToken=await genarateCSRFToken(id,res)
    return {accessToken,refreshToken,csrfToken}
}

export const verifyRefreshToken = async(refreshToken)=>{
    try {
        const decode=jwt.verify(refreshToken,process.env.REFRESH_SECRET)
        const storedToken = await redisClint.get(`refresh_token:${decode.id}`)
        if(storedToken===refreshToken){
            return decode
        }
        return null
    } catch (error) {
      return null  
    }
}

export const generateAccessToken=(id,res)=>{
    const accessToken =jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"15m",
    });
      res.cookie("accessToken",accessToken,{
        httpOnly:true,
       secure:isProd,
        sameSite:isProd?"none":"lax",
        maxAge:15*60*1000
    });
}

export const revokeRefreshToken = async(userId)=>{
   await redisClint.del(`refresh_token:${userId}`)
   await revokeCSRFTOKEN(userId)
}