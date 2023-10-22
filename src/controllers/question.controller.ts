import { Request, Response, NextFunction } from "express";
import {
  questionConstant,
  commonConstant,
  fileConstant,
} from "../constants/message.constant";
import { QuestionModel } from "../models";
import { questionUpload } from "../helpers/fs.helper";

// add question
const addQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: { description },
      userData: { userId, email },
    } = req;
    const { file } = req as unknown as any;
    let questionPathUrl: string | undefined;
    if (file) {
      const questionPath = questionUpload(file, email, userId);
      if (!questionPath.status) {
        if (questionPath.msg === fileConstant.QUESTION_IMAGE_TYPE) {
          return res.status(400).json({
            success: false,
            message: fileConstant.QUESTION_IMAGE_TYPE,
            data: null,
          });
        }
        return res.status(400).json({
          success: false,
          message: fileConstant.QUESTION_IMAGE_SIZE,
          data: null,
        });
      }
      questionPathUrl = questionPath.data;
    }
    // add question
    const question = await QuestionModel.create({
      ...(description && { description }),
      ...(questionPathUrl && { questionImage: questionPathUrl }),
      userId,
      status: 1,
    });
    return res.status(200).json({
      success: true,
      message: questionConstant.QUESTION_ADDED,
      data: question,
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

// list question
const listQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userData: { userId },
    } = req;

    // find all question
    const questions = await QuestionModel.find({
      userId,
    });
    return res.status(200).json({
      success: true,
      message: questionConstant.QUESTIONs_GET_SUCCESSFULLY,
      data: questions,
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

export default { addQuestion, listQuestions };
