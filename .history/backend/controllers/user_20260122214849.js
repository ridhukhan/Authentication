import { registerSchema } from "../config/zod.js";
import { redisClint } from "../index.js";
import TryCatch from "../middlewares/trycatch.js";
import sanitize from "mongo-sanitize"
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto"
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
const hashpassword = await bcrypt.hash(password,10);
const verifyToken=crypto.randomBytes(32).toString("hex");
const verifyKey =`verify:${verifyToken}`;
const datatoStore=JSON.stringify({
    fullname,
    email,
    password:hashpassword
})
await redisClint.set(verifyKey,datatoStore,{EX:300})
    res.json({
        fullname,
        email,
        password,
    })
})