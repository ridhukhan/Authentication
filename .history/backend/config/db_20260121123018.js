import mongoose from "mongoose";
const coonectDB = async()=>{
try {
    await mongoose.connect(process.env.MONGO_DB_URL)
} catch (error) {
    console.log(error.message,"db not connect")
}
}