import { Joi } from "celebrate";

// add question validation schema
const addQuestionValidationSchema = {
  body: {
    description: Joi.string().trim().optional(),
  },
};

// add question validation schema
const editQuestionValidationSchema = {
  body: {
    description: Joi.string().trim().optional(),
  },
};
export default {
  addQuestionValidationSchema,
  editQuestionValidationSchema
};
