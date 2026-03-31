import mongoose from "mongoose";
import { config } from "./config.js";

export async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("database connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}
