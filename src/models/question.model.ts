import { Schema, model } from "mongoose";

// Define the schema for the data
const questionSchema = new Schema({
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
    type: Number,
    required: true,
    default: 0,
    enum: [0, 1, 3],
  },
});

// Create a model from the schema
export const QuestionModel = model("Question", questionSchema);
