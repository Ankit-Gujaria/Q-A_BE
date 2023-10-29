import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { QuestionModel } from "../models/question.model";
import { authConstant } from "../constants/message.constant";
import schemaConstant from "../constants/schema.constant";
import { reportConstant } from "../constants/message.constant";
import moment from "moment";

// report question data
const questionReport = async (req: Request, res: Response) => {
  try {
    const {
      userData: { userId },
      query: { status, startDate, endDate, questionerId },
    } = req;

    const startDateOfQuestion = startDate ? moment(startDate as string) : null;
    const endDateOfQuestion = startDate ? moment(endDate as string) : null;
    // find login user
    const user = await UserModel.findOne({
      _id: userId,
    }).select({ _id: 1, role: 1 });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: authConstant.USER_NOT_FOUND,
        data: null,
      });
    }
    // find question with given status and given time period
    const questionReport = await QuestionModel.find({
      ...(status && { status: status }),
      ...(user.role === schemaConstant.userRole.CUSTOMER && {
        userId: user._id,
      }),
      ...(startDate &&
        endDate && {
          createdAt: { $gte: startDateOfQuestion, $lte: endDateOfQuestion },
        }),
      ...(questionerId && { userId: questionerId }),
    });

    return res.status(200).json({
      success: true,
      message: reportConstant.GET_REPORT,
      data: questionReport,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
      data: null,
    });
  }
};

export default { questionReport };
