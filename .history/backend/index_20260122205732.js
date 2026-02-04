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

await  connectDB()
app.listen(PORT,()=>{
    console.log(`your app is running at http://localhost:${PORT}`)
   
})



