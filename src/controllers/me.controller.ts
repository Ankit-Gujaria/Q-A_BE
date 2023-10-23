import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import {
  authConstant,
  commonConstant,
  userConstant,
} from "../constants/message.constant";

// Login user data
const getLoginUser = async (req: Request, res: Response) => {
  try {
    const {
      userData: { userId },
    } = req;

    // find login user
    const user = await UserModel.findOne({
      _id: userId,
    }).select({ _id: 1, name: 1, status: 1, email: 1, phone: 1, role: 1 });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: authConstant.USER_NOT_FOUND,
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: commonConstant.SUCCESS,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
      data: null,
    });
  }
};

// update login user data
const editLoginUser = async (req: Request, res: Response) => {
  try {
    const {
      body: { name, phone },
      userData: { userId },
    } = req;

    // find login user
    const user = await UserModel.findOne({
      _id: userId,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: authConstant.USER_NOT_FOUND,
        data: null,
      });
    }

    // update user
    await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        name,
        phone,
      }
    );
    return res.status(200).json({
      success: true,
      message: userConstant.USER_UPDATE,
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
      data: null,
    });
  }
};

export default { getLoginUser, editLoginUser };
