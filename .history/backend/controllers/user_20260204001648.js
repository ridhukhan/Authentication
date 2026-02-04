import { registerSchema } from "../config/zod.js";
import { redisClint } from "../index.js";
import TryCatch from "../middlewares/trycatch.js";
import sanitize from "mongo-sanitize"
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto"
import sendMail from "../config/sendMail.js";
import { getVerifyEmailHtml } from "../config/html.js";
import { timeStamp } from "console";
import { email } from "zod";
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
export const verifyUser = TryCatch(async (req, res) => {
  const { token } = req.params;

  if(!token){
    return res.status(400).json({
        message:"verification token is required"
    })
  }
  const verifykey = `verify:${token}`;
  const userDataJson=await redisClint.get(verifykey)

  if(!userDataJson){
      return res.status(400).json({
        message:"verification Link is expired"})

  }
  await redisClint.del(verifykey)
  const userData = JSON.parse(userDataJson)

   const existingUser = await User.findOne({email:userData.email});

    if(existingUser){
        return res.status(400).json({
            message:"User Already Exists"
        })
    }
    const newUser = await User.create({
        fullname:userData.fullname,
        email:userData.email,
        password:userData.password,
    })
    res.status(201).json({message:"email verification successfully",
        user:{_id:newUser._id,fullname:newUser.fullname,email:newUser.email}
    })
});
export const loginUser = TryCatch( async(req,res)=>{
   const sanitizeBody =sanitize(req.body)
    const validation = registerSchema.safeParse(sanitizeBody)
    if(!validation.success){
        const zodError = validation.error
        return res.status(400).json({
            message:zodError
        });
    };
    const {email,password}=validation.data;
  
})