import { registerSchema } from "../config/zod.js";
import TryCatch from "../middlewares/trycatch.js";
import sanitize from "mongo-sanitize"
export const registerUser = TryCatch(async(req,res)=>{
    const sanitizeBody =sanitize(req.body)
    const validation = registerSchema.safeParse(sanitizeBody)
    if(!validation.success){
        return res.status(400).json({
            message:"validation faild"
        });
    };

    const {fullname,email,password}=validation.data;
    res.json({
        fullname,
        email,
        password,
    })
})