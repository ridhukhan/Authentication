import TryCatch from "../middlewares/trycatch.js";
import sanitize from "mongo-sanitize"
export const registerUser = TryCatch(async(req,res)=>{
    const {fullname,email,password}=req.body
    res.json({
        fullname,
        email,
        password,
    })
})