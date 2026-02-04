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
    res.cookie("accessToken:",accessToken)
}