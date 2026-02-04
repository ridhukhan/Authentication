import express from "express"


import dotenv from "dotenv"
import connectDB from "./config/db"
dotenv.config()
const PORT = process.env.PORT || 5000
const app=express()

app.listen(PORT,()=>{
    console.log(`your app is running at http://localhost:${PORT}`)
    connectDB
})



