import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model";
import { hashPassword, signToken } from "../helpers/auth.helper";
import { authConstant } from "../constants/message.constant";
import schemaConstant from "../constants/schema.constant";

// User's Registration
const registration = async (req: Request, res: Response) => {
  try {
    const {
      body: { name, email, password, phone },
    } = req;
    // find user exist on same email
    const user = await UserModel.findOne({ email: email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: authConstant.USER_EXIST, data: null });
    // hash password
    const hashedPassword = await hashPassword(password);

    // add user
    await UserModel.create({
      name,
      email,
      role: schemaConstant.userRole.CUSTOMER,
      password: hashedPassword,
      phone,
    });

    return res.status(200).json({
      success: true,
      message: authConstant.USER_CREATED,
      data: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
      data: null,
    });
  }
};

// User's Login
const login = async (req: Request, res: Response) => {
  try {
    const {
      body: { email, password },
    } = req;
    // check user exist
    const user = await UserModel.findOne({
      email,
      isDeleted: false,
      status: schemaConstant.userStatus.ACTIVE,
    });
    if (!user)
      return res.status(404).json({
        success: false,
        message: authConstant.USER_NOT_FOUND,
        data: null,
      });

    // compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({
        success: false,
        message: authConstant.INVALID_USER,
        data: null,
      });

    // token data
    const tokenData = {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // generate token
    const token = await signToken(tokenData);
    if (!token.success)
      return res.status(404).json({
        success: false,
        message: authConstant.TOKEN_NOT_CREATED,
        data: null,
      });

    // login user data
    const userData = {
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token.data,
    };

    return res.status(200).json({
      success: true,
      message: authConstant.LOGIN_SUCCESS,
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
      data: null,
    });
  }
};

export default { registration, login };
