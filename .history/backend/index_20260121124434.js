import express from "express"
import userRoute from "./routes/user.js"

import dotenv from "dotenv"
import connectDB from "./config/db.js"

app.use("/api/user",userRoute)


















dotenv.config()
const PORT = process.env.PORT || 5000
const app=express()
await  connectDB()
app.listen(PORT,()=>{
    console.log(`your app is running at http://localhost:${PORT}`)
   
})



