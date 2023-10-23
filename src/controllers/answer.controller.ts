import { Request, Response, NextFunction } from "express";
import {
  commonConstant,
  fileConstant,
  answerConstant,
  questionConstant,
} from "../constants/message.constant";
import { AnswerModel, QuestionModel } from "../models";
import { answerUpload, deleteAnswerImage } from "../helpers/fs.helper";
import moment from "moment";
import schemaConstant from "../constants/schema.constant";

// add question
export const addAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { description },
      userData: { userId, email },
      query: { questionId },
    } = req;
    const { file } = req as unknown as any;
    let answerPathUrl: string | undefined;

    // check question is expired or not
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: questionConstant.QUESTION_NOT_FOUND,
        data: null,
      });
    }
    if (!question.expiryDate) {
      return res.status(404).json({
        success: false,
        message: questionConstant.QUESTION_EXPIRY_TIME_NOT_FOUND,
        data: null,
      });
    }
    const questionExpiryTimestamp = moment(question.expiryDate).format("X");
    const currentTimestamp = moment().format("X");
    if (questionExpiryTimestamp < currentTimestamp) {
      return res.status(400).json({
        success: false,
        message: questionConstant.QUESTION_EXPIRED,
        data: null,
      });
    }
    if (file) {
      const questionPath = answerUpload(file, email, userId);
      if (!questionPath.status) {
        if (questionPath.msg === fileConstant.IMAGE_TYPE) {
          return res.status(400).json({
            success: false,
            message: fileConstant.IMAGE_TYPE,
            data: null,
          });
        }
        return res.status(400).json({
          success: false,
          message: fileConstant.IMAGE_SIZE,
          data: null,
        });
      }
      answerPathUrl = questionPath.data;
    }

    // add answer
    const answer = await AnswerModel.create({
      ...(description && { description }),
      ...(answerPathUrl && { answerImage: answerPathUrl }),
      userId,
      questionId,
    });

    // update question status
    question.status = schemaConstant.questionStatus.ANSWERED;
    await question.save();

    return res.status(200).json({
      success: true,
      message: answerConstant.ANSWER_ADDED,
      data: answer,
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

// get answer details
export const answerDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = req;
    const answer = await (
      await AnswerModel.findById(id)
    ).populate("questionId");
    if (!answer) {
      return res.status(404).json({
        success: false,
        message: answerConstant.ANSWER_NOT_FOUND,
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: answerConstant.ANSWER_DETAILS,
      data: answer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: commonConstant.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

// Edit answer
const editAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: { description },
      userData: { userId, email },
      params: { id },
      query: { questionId },
    } = req;
    const { file } = req as unknown as any;
    let answerPathUrl: string | undefined;

    // find answer
    const answerData = await AnswerModel.findById(id);
    if (!answerData) {
      return res.status(404).json({
        success: false,
        message: answerConstant.ANSWER_NOT_FOUND,
        data: null,
      });
    }

    // find question
    const questionData = await QuestionModel.findById(questionId);
    if (!questionData) {
      return res.status(404).json({
        success: false,
        message: questionConstant.QUESTION_NOT_FOUND,
        data: null,
      });
    }
    // check question expiry time
    if (!questionData.expiryDate) {
      return res.status(404).json({
        success: false,
        message: questionConstant.QUESTION_EXPIRY_TIME_NOT_FOUND,
        data: null,
      });
    }
    const questionExpiryTimestamp = moment(questionData.expiryDate).format("X");
    const currentTimestamp = moment().format("X");
    if (questionExpiryTimestamp < currentTimestamp) {
      return res.status(400).json({
        success: false,
        message: questionConstant.QUESTION_EXPIRED,
        data: null,
      });
    }

    if (file) {
      const answerPath = answerUpload(file, email, userId);
      if (!answerPath.status) {
        if (answerPath.msg === fileConstant.IMAGE_TYPE) {
          return res.status(400).json({
            success: false,
            message: fileConstant.IMAGE_TYPE,
            data: null,
          });
        }
        return res.status(400).json({
          success: false,
          message: fileConstant.IMAGE_SIZE,
          data: null,
        });
      }
      answerPathUrl = answerPath.data;
    }

    if (answerData.answerImage && file) {
      deleteAnswerImage(userId, answerData.answerImage);
    }
    // update answer
    await AnswerModel.updateOne(
      {
        _id: id,
      },
      {
        ...(description && { description }),
        ...(answerPathUrl && { answerImage: answerPathUrl }),
      }
    );

    return res.status(200).json({
      success: true,
      message: answerConstant.ANSWER_UPDATED,
      data: null,
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

export default { addAnswer, answerDetails, editAnswer };
