import { Schema, model } from "mongoose";

// Define the schema for the data
const answerSchema = new Schema({
  description: {
    type: String,
    required: false,
  },
  answerImage: {
    type: String,
    required: false,
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Create a model from the schema
export const AnswerModel = model("Answer", answerSchema);
