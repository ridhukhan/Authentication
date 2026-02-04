import { registerSchema } from "../config/zod.js";
import { redisClint } from "../index.js";
import TryCatch from "../middlewares/trycatch.js";
import sanitize from "mongo-sanitize"
import { User } from "../models/user.js";
export const registerUser = TryCatch(async(req,res)=>{
    const sanitizeBody =sanitize(req.body)
    const validation = registerSchema.safeParse(sanitizeBody)
    if(!validation.success){
        const zodError = validation.error
        return res.status(400).json({
            message:zodError
        });
    };

    const {fullname,email,password}=validation.data;
    const retLimitKey=`register-rate-limit:${req.ip}:${email}`;

    if (await redisClint.get(retLimitKey)){
        return res.status(429).json({
            message:"too many requests, try again leter"
        })
    }
    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(400).json({
            message:"User Already Exists"
        })
    }
    res.json({
        fullname,
        email,
        password,
    })
})