import { Joi } from "celebrate";
import { authConstant } from "../constants/message.constant";

// user status update validation schema
const userUpdateStatus = {
  body: {
    status: Joi.string().required(),
  },
  params: {
    id: Joi.string().required(),
  },
};

const editUserSchema = {
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
    status: Joi.string().optional(),
  },
};
export default { userUpdateStatus, editUserSchema };
