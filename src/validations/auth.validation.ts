import { Joi } from "celebrate";
import { authConstant } from "../constants/message.constant";

// user's registration validation schema
const registrationSchema = {
  body: {
    name: Joi.string()
      .trim()
      .min(3)
      .pattern(/^[a-zA-Z ]+$/)
      .required()
      .messages({
        "string.pattern.base": authConstant.NAME_VALIDATION,
      }),
    email: Joi.string().trim().email().required(),
    phone: Joi.string()
      .trim()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.pattern.base": authConstant.MOBILE_VALIDATION,
      }),
    password: Joi.string()
      .trim()
      .regex(/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
      .required()
      .messages({ "string.pattern.base": authConstant.PASSWORD_VALIDATION }),
  },
};

// user's login validation schema
const loginSchema = {
  body: {
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  },
};

export default { registrationSchema, loginSchema };
