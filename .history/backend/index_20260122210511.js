import express from "express"
import userRoute from "./routes/user.js"
import { createClient } from "redis"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
dotenv.config()
const PORT = process.env.PORT || 5000
const app=express()
app.use(express.json())
app.use("/api/user",userRoute)
const redisUrl =process.env.REDIS_URL
if(!redisUrl){
    console.log("missing redis")
    process.exit(1)
}
export const redisClint = createClient({

    url:redisUrl,
})
await  connectDB()
app.listen(PORT,()=>{
    console.log(`your app is running at http://localhost:${PORT}`)
   
})



