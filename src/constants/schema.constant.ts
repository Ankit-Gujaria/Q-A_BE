enum USER_ROLE {
  admin = 1,
  seller = 2,
  customer = 3,
}
enum FILE {
  FILE_SIZE = 5242880, // 5242880 bytes = 5mb
  PROFILE_SIZE = 1048576, // 1048576 Bytes = 1mb
  FILE_PDF = "application/pdf",
  FILE_DOCX = "application/msword",
  FILE_DOC = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  FILE_PNG = "image/png",
  FILE_JPG = "image/jpg",
  FILE_JPEG = "image/jpeg",
}
const schemaConstant = Object.freeze({
  userRole: USER_ROLE,
  file: FILE,
});

export default schemaConstant;
