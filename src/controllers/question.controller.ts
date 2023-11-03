import { Request, Response, NextFunction } from "express";
import moment from "moment";
import { Types } from "mongoose";
import {
  questionConstant,
  commonConstant,
  fileConstant,
} from "../constants/message.constant";
import { QuestionModel } from "../models";
// import { deleteQuestionImage, questionUpload } from "../helpers/fs.helper";
import schemaConstant from "../constants/schema.constant";
import { deleteFile, upload } from "../helpers/s3.helper";

// Add question
const addQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: { description },
      userData: { userId, email },
    } = req;
    const { file } = req as unknown as any;
    const expiredTime = moment().add(2, "h");
    let questionPathUrl: string | undefined;
    if (file) {
      // const questionPath = questionUpload(file, email, userId);
      // if (!questionPath.status) {
      //   if (questionPath.msg === fileConstant.IMAGE_TYPE) {
      //     return res.status(400).json({
      //       success: false,
      //       message: fileConstant.IMAGE_TYPE,
      //       data: null,
      //     });
      //   }
      //   return res.status(400).json({
      //     success: false,
      //     message: fileConstant.IMAGE_SIZE,
      //     data: null,
      //   });
      // }
      // questionPathUrl = questionPath.data;
      const imageData = await upload(file);
      questionPathUrl = imageData.Location;
    }
    // Add question
    const question = await QuestionModel.create({
      ...(description && { description }),
      ...(questionPathUrl && { questionImage: questionPathUrl }),
      userId,
      expiryDate: expiredTime,
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

// List question
const listQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userData: { userId, role },
      query: { status },
    } = req;

    // find all question
    const questions = await QuestionModel.aggregate([
      {
        $lookup: {
          from: "answers", // Name of the answers collection
          localField: "_id", // Field in the questions collection
          foreignField: "questionId", // Field in the answers collection
          as: "answers", // Alias for the joined array
        },
      },
      {
        $match: {
          ...(status && { status: status }),
          ...(role === schemaConstant.userRole.CUSTOMER && { userId }),
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: questionConstant.QUESTIONS_GET_SUCCESSFULLY,
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

// Get question details
const questionDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = req;
    const questionId = new Types.ObjectId(id);
    // find all question
    const questions = await QuestionModel.aggregate([
      {
        $lookup: {
          from: "answers", // Name of the answers collection
          localField: "_id", // Field in the questions collection
          foreignField: "questionId", // Field in the answers collection
          as: "answers", // Alias for the joined array
        },
      },
      {
        $match: {
          _id: questionId,
        },
      },
    ]);

    if (!questions[0]) {
      return res.status(404).json({
        success: false,
        message: questionConstant.QUESTION_NOT_FOUND,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: questionConstant.QUESTION_DETAILS,
      data: questions[0],
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

// Edit question
const editQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { description },
      userData: { userId, email },
      params: { id },
    } = req;
    const { file } = req as unknown as any;
    let questionPathUrl: string | undefined;

    // find question
    const questionData = await QuestionModel.findById(id);

    if (!questionData) {
      return res.status(404).json({
        success: false,
        message: questionConstant.QUESTION_NOT_FOUND,
        data: null,
      });
    }
    if (questionData.status !== schemaConstant.questionStatus.PENDING) {
      return res.status(404).json({
        success: false,
        message: questionConstant.QUESTION_STATUS_NOT_PENDING,
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
      // const questionPath = questionUpload(file, email, userId);
      // if (!questionPath.status) {
      //   if (questionPath.msg === fileConstant.IMAGE_TYPE) {
      //     return res.status(400).json({
      //       success: false,
      //       message: fileConstant.IMAGE_TYPE,
      //       data: null,
      //     });
      //   }
      //   return res.status(400).json({
      //     success: false,
      //     message: fileConstant.IMAGE_SIZE,
      //     data: null,
      //   });
      // }
      // questionPathUrl = questionPath.data;
      const imageData = await upload(file);
      questionPathUrl = imageData.Location;
    }

    if (questionData.questionImage && file) {
      // deleteQuestionImage(userId, questionData.questionImage);
      await deleteFile(questionData.questionImage);
    }
    // update question
    await QuestionModel.updateOne(
      {
        _id: id,
      },
      {
        ...(description && { description }),
        ...(questionPathUrl && { questionImage: questionPathUrl }),
        userId,
      }
    );
    return res.status(200).json({
      success: true,
      message: questionConstant.QUESTION_UPDATED,
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

// update question status
const updateQuestionStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { status },
      params: { id },
    } = req;

    // find question
    const questionData = await QuestionModel.findById(id);

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
    // update question status
    questionData.status = status;
    await questionData.save();

    return res.status(204).json({
      success: true,
      message: questionConstant.QUESTION_STATUS_UPDATED,
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

export default {
  addQuestion,
  listQuestions,
  questionDetails,
  editQuestion,
  updateQuestionStatus,
};
