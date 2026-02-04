import TryCatch from "../middlewares/trycatch.js";

export const registerUser = TryCatch(async(req,res)=>{
    const {name,email,password}=req.body
    res.json({
        name,
        email,
        password,
    })
})