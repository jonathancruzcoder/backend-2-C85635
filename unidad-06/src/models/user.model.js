import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true 
    },
    role: { 
      type: String, 
      default: "user" 
    },
    password: { 
      type: String, 
      required: true 
    }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
