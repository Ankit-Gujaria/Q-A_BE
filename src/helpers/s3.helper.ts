import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const upload = async (file: any) => {
  const bucket = process.env.BUCKET_NAME;
  const currentTimestamp = new Date().getTime();
  const key = `${currentTimestamp}-${file.originalname}`;
  const params: S3.PutObjectRequest = {
    Bucket: bucket,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };
  return s3
    .upload(params)
    .promise()
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const deleteFile = async (imageUrl: string) => {
  const urlArray = imageUrl.split("/");
  const key = urlArray[-1];
  const option = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  };
  return s3
    .deleteObject(option)
    .promise()
    .catch((err) => {
      console.log("Error =>", err);
      throw err;
    });
};

export { upload, deleteFile };
