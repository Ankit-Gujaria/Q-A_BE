import { Joi } from "celebrate";
import { authConstant } from "../constants/message.constant";

// Edit login user schema
const editLoginUserSchema = {
  body: {
    name: Joi.string()
      .trim()
      .min(3)
      .pattern(/^[a-zA-Z ]+$/)
      .optional()
      .messages({
        "string.pattern.base": authConstant.NAME_VALIDATION,
      }),
    phone: Joi.string()
      .trim()
      .length(10)
      .pattern(/^[0-9]+$/)
      .optional()
      .messages({
        "string.pattern.base": authConstant.MOBILE_VALIDATION,
      }),
  },
};

export default { editLoginUserSchema };
