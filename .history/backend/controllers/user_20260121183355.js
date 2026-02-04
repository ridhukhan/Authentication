import TryCatch from "../middlewares/trycatch.js";

export const registerUser = TryCatch(async(req,res)=>{
    const {fullname,email,password}=req.body
    res.json({
        fullname,
        email,
        password,
    })
})