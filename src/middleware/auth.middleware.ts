import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";
import { decodeToken } from "../helpers/auth.helper";
import { authConstant, commonConstant } from "../constants/message.constant";

// check authentication
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        success: false,
        message: authConstant.INVALID_TOKEN,
        data: null,
      });
    }
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    if (!token) {
      return res.status(419).json({
        success: false,
        message: authConstant.INVALID_TOKEN,
        data: null,
      });
    }
    const tokenData: any = decodeToken(token);
    // check validation from database
    const user = await UserModel.findOne({
      _id: tokenData.data.userId,
    });
    if (!tokenData.success) {
      return res.status(419).json({
        success: false,
        message: authConstant.INVALID_TOKEN,
        data: null,
      });
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: authConstant.ACCESS_DENIED,
        data: null,
      });
    }
    req.userData = tokenData.data;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: commonConstant.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

// check login user has customer role
export const customerRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userData } = req;
    // check user role type
    if (userData.role !== 1) {
      return res.status(401).json({
        success: false,
        message: authConstant.ACCESS_DENIED,
        data: null,
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: commonConstant.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

// check login user has admin role
export const adminRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userData } = req;
    // check user role type
    if (userData.role !== 0) {
      return res.status(401).json({
        success: false,
        message: authConstant.ACCESS_DENIED,
        data: null,
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: commonConstant.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};
