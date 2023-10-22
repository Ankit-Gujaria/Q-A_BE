export const authConstant = {
  USER_CREATED: "User created successfully",
  LIST_USER: "Users fetched successfully",
  UPDATE_USER_STATUS: "Status updated successfully",
  USER_EXIST: "User already exist on this email. Please use another email. ",
  LOGIN_SUCCESS: "Login successfully",
  USER_NOT_FOUND: "User not exist",
  TOKEN_NOT_CREATED: "Token not created",
  TOKEN_CREATED: "Token created",
  INVALID_TOKEN: "Invalid token",
  TOKEN_EXPIRED: "Token expired",
  TOKEN_DECODED: "Decoded payload",
  INVALID_TOKEN_DECODED: "Invalid decode",
  ACCESS_DENIED: "Access denied",
  INVALID_USER: "Invalid username or password",
  NAME_VALIDATION: 'Only characters are allowed in "firstName"',
  LAST_NAME_VALIDATION: 'Only characters are allowed in "lastName"',
  MOBILE_VALIDATION: 'Only numbers are allowed in "mobile"',
  PASSWORD_VALIDATION: `Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length`,
};

export const questionConstant = {
  QUESTION_ADDED: "Question added successfully",
  QUESTIONs_GET_SUCCESSFULLY: "Questions get successfully",
};

export const commonConstant = {
  INTERNAL_SERVER_ERROR: "Internal server error",
  SUCCESS: "Success",
  BAD_REQUEST: "Not found",
};

export const fileConstant = {
  FILE_TYPE: "Only .doc, .docx, .pdf file allowed",
  FILE_SIZE: "file size should be less then 5mb",
  QUESTION_IMAGE_SIZE: "Image size should be less then 1 mb",
  QUESTION_IMAGE_TYPE: "Only .png, .jpg, .jpeg file allowed",
};
