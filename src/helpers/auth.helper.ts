import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import * as Jwt from "jsonwebtoken";
import { authConstant } from "../constants/message.constant";
dotenv.config();

// hash password
export const hashPassword = async (password: string) => {
  const hashedPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUND, 10)
  );
  return hashedPassword;
};

// sign a token
export const signToken = (userTokenData: object) => {
  try {
    const token = Jwt.sign(userTokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    if (!token) {
      return {
        success: false,
        message: authConstant.TOKEN_NOT_CREATED,
        data: null,
      };
    }
    return { success: true, message: authConstant.TOKEN_CREATED, data: token };
  } catch (error) {
    return Promise.reject(new Error(error.message));
  }
};

// decode token
export const decodeToken = (token: string): object => {
  try {
    const jwtPayload = Jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!jwtPayload) {
      return {
        success: false,
        message: authConstant.INVALID_TOKEN_DECODED,
        data: null,
      };
    }
    return {
      success: true,
      message: authConstant.TOKEN_DECODED,
      data: jwtPayload,
    };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return {
        success: false,
        message: authConstant.TOKEN_EXPIRED,
        data: null,
      };
    }
    return {
      success: false,
      message: authConstant.INVALID_TOKEN,
      data: null,
    };
  }
};
