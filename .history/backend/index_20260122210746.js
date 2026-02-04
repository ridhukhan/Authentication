import express from "express"
import userRoute from "./routes/user.js"
import { createClient } from "redis"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { object } from "zod"
dotenv.config()
const PORT = process.env.PORT || 5000
const app=express()
app.use(express.json())
app.use("/api/user",userRoute)
await  connectDB()
const redisUrl =process.env.REDIS_URL
if(!redisUrl){
    console.log("missing redis")
    process.exit(1)
}
export const redisClint = createClient({

    url:redisUrl,
})
redisClint.connect().then(()=>console.log("connected to redis")).catch(console.error)

app.listen(PORT,()=>{
    console.log(`your app is running at http://localhost:${PORT}`)
   
})



