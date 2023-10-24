import { Schema, model } from "mongoose";

// Define the schema for the data
const questionSchema = new Schema(
  {
    description: {
      type: String,
      required: false,
    },
    questionImage: {
      type: String,
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiryDate: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
      enum: ["Pending", "Answered", "Expired", "Rejected"],
    },
  },
  {
    timestamps: true,
  }
);

// Create a model from the schema
export const QuestionModel = model("Question", questionSchema);
