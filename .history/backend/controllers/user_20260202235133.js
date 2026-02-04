import { registerSchema } from "../config/zod.js";
import { redisClint } from "../index.js";
import TryCatch from "../middlewares/trycatch.js";
import sanitize from "mongo-sanitize"
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto"
import sendMail from "../config/sendMail.js";
import { getVerifyEmailHtml } from "../config/html.js";
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
const subject = "verify your email for account creation"
const html =getVerifyEmailHtml({email,token:verifyToken});
await sendMail({email,subject,html})
await redisClint.set(retLimitKey,"true",{EX:60})
    res.json({
       message:"if your email is valid ,a varification like has been sent. it will expired in 5 min"
    })
})
export const verifyEmail = TryCatch(async(req, res) => {
    const { token } = req.body;  // body থেকে নিচ্ছি
    
    if (!token) {
        return res.status(400).json({
            message: "Token is required"
        });
    }
    
    const verifyKey = `verify:${token}`;
    
    // Redis থেকে data নিয়ে আসুন
    const userData = await redisClint.get(verifyKey);
    
    if (!userData) {
        return res.status(400).json({
            message: "Invalid or expired verification token"
        });
    }
    
    // Parse করুন
    const { fullname, email, password } = JSON.parse(userData);
    
    // Check if user already exists (safety check)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        await redisClint.del(verifyKey);
        return res.status(400).json({
            message: "User already exists"
        });
    }
    
    // User create করুন
    const user = await User.create({
        fullname,
        email,
        password
    });
    
    // Redis থেকে delete করুন
    await redisClint.del(verifyKey);
    
    res.status(201).json({
        message: "Email verified successfully! Account created.",
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email
        }
    });
});
