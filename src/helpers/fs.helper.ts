import fs from "fs";
import schemaConstant from "../constants/schema.constant";
import { fileConstant, commonConstant } from "../constants/message.constant";

// upload question
export const questionUpload = (file: any, fileName: any, id: any) => {
  const folderName = `public/uploads/question/${id}`;
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, { recursive: true });
  }
  const questionImageFilePath = `${folderName}/${fileName}-${Date.now()}-${
    file.originalname
  }`;
  const imagePath = `${fileName}-${Date.now()}-${file.originalname}`;
  const data = file.buffer;
  const fileSize = file.size;
  const fileType = file.mimetype;
  if (
    !(
      fileType === schemaConstant.file.FILE_PNG ||
      fileType === schemaConstant.file.FILE_JPG ||
      fileType === schemaConstant.file.FILE_JPEG
    )
  ) {
    return { status: false, msg: fileConstant.IMAGE_TYPE };
  }
  if (fileSize > schemaConstant.file.FILE_SIZE) {
    return { status: false, msg: fileConstant.IMAGE_SIZE };
  }
  fs.writeFileSync(questionImageFilePath, data);
  return { status: true, msg: commonConstant.SUCCESS, data: imagePath };
};

// upload answer
export const answerUpload = (file: any, fileName: any, id: any) => {
  const folderName = `public/uploads/answer/${id}`;
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, { recursive: true });
  }
  const answerImageFilePath = `${folderName}/${fileName}-${Date.now()}-${
    file.originalname
  }`;
  const imagePath = `${fileName}-${Date.now()}-${file.originalname}`;
  const data = file.buffer;
  const fileSize = file.size;
  const fileType = file.mimetype;
  if (
    !(
      fileType === schemaConstant.file.FILE_PNG ||
      fileType === schemaConstant.file.FILE_JPG ||
      fileType === schemaConstant.file.FILE_JPEG
    )
  ) {
    return { status: false, msg: fileConstant.IMAGE_TYPE };
  }
  if (fileSize > schemaConstant.file.FILE_SIZE) {
    return { status: false, msg: fileConstant.IMAGE_SIZE };
  }
  fs.writeFileSync(answerImageFilePath, data);
  return { status: true, msg: commonConstant.SUCCESS, data: imagePath };
};

// delete Question
export const deleteQuestionImage = (id: any, filePath: any) => {
  const file = `public/uploads/question/${id}/${filePath}`
  try {
    fs.stat(file, (err) => {
      if (err) {
        return { status: false, msg: err }
      }
    })
    fs.unlink(file, (err) => {
      if (err) return { status: false, msg: err }
    })
    return { status: true }
  } catch (err) {
    return { status: false, msg: err }
  }
}

// delete Answer
export const deleteAnswerImage = (id: any, filePath: any) => {
  const file = `public/uploads/answer/${id}/${filePath}`
  try {
    fs.stat(file, (err) => {
      if (err) {
        return { status: false, msg: err }
      }
    })
    fs.unlink(file, (err) => {
      if (err) return { status: false, msg: err }
    })
    return { status: true }
  } catch (err) {
    return { status: false, msg: err }
  }
}