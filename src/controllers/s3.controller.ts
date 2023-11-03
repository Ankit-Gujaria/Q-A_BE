import { Request, Response, NextFunction } from "express";
import { upload, deleteFile } from "../helpers/s3.helper";
import { commonConstant } from "../constants/message.constant";

// upload file
const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { file } = req;
    const fileObject = await upload(file);
    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: fileObject,
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

// delete file
const deleteFileFromS3 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { key },
    } = req;
    await deleteFile(key);
    return res.status(200).json({
      success: true,
      message: "File deleted successfully",
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

export default { uploadFile, deleteFileFromS3 };
