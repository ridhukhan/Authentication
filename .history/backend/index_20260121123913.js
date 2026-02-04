import express from "express"


import dotenv from "dotenv"
import connectDB from "./config/db.js"
dotenv.config()
const PORT = process.env.PORT || 5000
const app=express()
await  connectDB()
app.listen(PORT,()=>{
    console.log(`your app is running at http://localhost:${PORT}`)
   
})



