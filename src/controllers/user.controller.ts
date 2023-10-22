import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { authConstant, commonConstant } from "../constants/message.constant";

// List users
const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find().select({
      _id: 1,
      name: 1,
      status: 1,
      email: 1,
      phone: 1,
    });

    return res.status(200).json({
      success: true,
      message: authConstant.LIST_USER,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: commonConstant.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

// update user status
const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const {
      body: { status },
      params: { id },
    } = req;
    const user = await UserModel.findOne({
      _id: id,
    });
    if (!user) {
      return res.status(200).json({
        success: false,
        message: authConstant.USER_NOT_FOUND,
        data: null,
      });
    }

    // update user
    const userData = await UserModel.updateOne(
      {
        _id: id,
      },
      {
        status,
      }
    );
    return res.status(200).json({
      success: true,
      message: authConstant.UPDATE_USER_STATUS,
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: commonConstant.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

export default { listUsers, updateUserStatus };
