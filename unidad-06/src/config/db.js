import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Conexión correcta con MongoDB");
  } catch (error) {
    console.error("Error de Conexión con MongoDB:", error.message);
    process.exit(1);
  }
};