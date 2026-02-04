import jwt from "jsonwebtoken"
import { redisClint } from "../index.js";
export const genarateToken = async (id,res)=>{
    const accessToken = jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"1m",
    });
    const refreshToken =jwt.sign({id},process.env.REFRESH_SECRET,{
        expiresIn:"16d",
    });
    const refreshTokenkey=`refresh_token:${id}`;
    await redisClint.setEx(refreshTokenkey,16*24*60*60,refreshToken);
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
       // secure:true,
        sameSite:"strict",
        maxAge:1*60*1000
    });
    res.cookie("refreshToken",refreshToken,{
        maxAge: 7*24*60*1000,
        httpOnly:true,
        sameSite:"none",
        //secure:true
    })
    return {accessToken,refreshToken}
}