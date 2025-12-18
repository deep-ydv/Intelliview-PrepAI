import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

// ✅ MongoDB connection
export const connectDB=async()=>{
  try{
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connected Successfully")
  }
  catch(error){
    console.log("Error in Connecting MongoDD...",error);
    process.exit(1) //stop the server if DB fails
  }
}