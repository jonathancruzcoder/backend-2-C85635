import mongoose from "mongoose";

export async function connectMongo(uri) {
  try {
    await mongoose.connect(uri);
    console.log("[MongoDB] Connected");
  } catch (err) {
    console.error("[MongoDB] Connection error:", err.message);
    process.exit(1);
  }
}
