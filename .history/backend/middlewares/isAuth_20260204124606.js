import jwt from "jsonwebtoken"

export const isAuth = async (req,res,next)=>{
    try {
const token = req.cookie.accessToken;
if(!token){
    return res.status(400).json({
        message:"please Login - no token"
    })
}
const decodedData=jwt.verify(token,process.env.JWT_SECRET)
if(!decodedData){
    return res.status(400).json({
        message:"token expired"
    })
}
    } catch (error) {
        
    }
}