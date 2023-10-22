import { Joi } from "celebrate";

// user status update validation schema
const userUpdateStatus = {
  body: {
    status: Joi.number().required(),
  },
  params: {
    id: Joi.string().required(),
  },
};

export default { userUpdateStatus };
