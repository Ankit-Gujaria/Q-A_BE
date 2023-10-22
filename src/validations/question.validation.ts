import { Joi } from "celebrate";

// add question validation schema
const addQuestionValidationSchema = {
  body: {
    description: Joi.string().trim().optional(),
  },
};

export default {
  addQuestionValidationSchema,
};
