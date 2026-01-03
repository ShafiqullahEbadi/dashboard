import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI_LOCAL);
      console.log("MONGODB CONNECTED SUCCESSFULLY!");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
      process.exit(1); 
    }
  };
