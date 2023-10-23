import { Schema, model } from "mongoose";

// Define the schema for the data
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
      enum: [0, 1],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model from the schema
export const UserModel = model("User", userSchema);
