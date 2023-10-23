import { Joi } from "celebrate";

// add answer validation schema
const addAnswerValidationSchema = {
  body: {
    description: Joi.string().trim().optional(),
  },
};

// edit answer validation schema
const editAnswerValidationSchema = {
    body: {
      description: Joi.string().trim().optional(),
    },
  };

export default {
    addAnswerValidationSchema,
    editAnswerValidationSchema
};
