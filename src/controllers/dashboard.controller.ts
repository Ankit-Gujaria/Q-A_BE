import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { authConstant, commonConstant } from "../constants/message.constant";
import { QuestionModel } from "../models";
import schemaConstant from "../constants/schema.constant";

// dash board data
const dashboardCount = async (req: Request, res: Response) => {
  try {
    // user count
    const activeUserCount = await UserModel.count({
      status: 1,
      isDeleted: false,
    });
    const inActiveUserCount = await UserModel.count({
      status: 0,
      isDeleted: false,
    });
    const TotalCount = activeUserCount + inActiveUserCount;

    // question count
    const answerQuestionCount = await QuestionModel.count({
      status: schemaConstant.questionStatus.ANSWERED,
    });
    const expiredQuestionCount = await QuestionModel.count({
      status: schemaConstant.questionStatus.EXPIRED,
    });
    const pendingQuestionCount = await QuestionModel.count({
      status: schemaConstant.questionStatus.PENDING,
    });
    const rejectedQuestionCount = await QuestionModel.count({
      status: schemaConstant.questionStatus.REJECTED,
    });

    return res.status(200).json({
      success: true,
      message: commonConstant.SUCCESS,
      data: {
        user: {
          active: activeUserCount,
          inactive: inActiveUserCount,
          total: TotalCount,
        },
        question: {
          answered: answerQuestionCount,
          rejected: rejectedQuestionCount,
          pending: pendingQuestionCount,
          expired: expiredQuestionCount,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
      data: null,
    });
  }
};

export default { dashboardCount };
