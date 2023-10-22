import fs from "fs";
import schemaConstant from "../constants/schema.constant";
import { fileConstant, commonConstant } from "../constants/message.constant";

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
    return { status: false, msg: fileConstant.QUESTION_IMAGE_TYPE };
  }
  if (fileSize > schemaConstant.file.FILE_SIZE) {
    return { status: false, msg: fileConstant.QUESTION_IMAGE_SIZE };
  }
  fs.writeFileSync(questionImageFilePath, data);
  return { status: true, msg: commonConstant.SUCCESS, data: imagePath };
};
