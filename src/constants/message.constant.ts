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
  QUESTIONS_GET_SUCCESSFULLY: "Questions get successfully",
  QUESTION_NOT_FOUND: "Question not found",
  QUESTION_EXPIRY_TIME_NOT_FOUND: "Question expiry time not found",
  QUESTION_DETAILS: "Get question details successfully",
  QUESTION_EXPIRED: "Question has been expired",
  QUESTION_UPDATED: " Question updated successfully",
  QUESTION_STATUS_UPDATED: " Question status updated successfully",
  QUESTION_STATUS_NOT_PENDING:
    "You can update question if status in not pending",
};

export const answerConstant = {
  ANSWER_ADDED: "Answer added successfully",
  ANSWER_GET_SUCCESSFULLY: "Answer get successfully",
  ANSWER_NOT_FOUND: "Answer not found",
  ANSWER_DETAILS: "Get answer details successfully",
  ANSWER_UPDATED: "Answer updated successfully",
};

export const commonConstant = {
  INTERNAL_SERVER_ERROR: "Internal server error",
  SUCCESS: "Success",
  BAD_REQUEST: "Not found",
};

export const fileConstant = {
  FILE_TYPE: "Only .doc, .docx, .pdf file allowed",
  FILE_SIZE: "file size should be less then 5mb",
  IMAGE_SIZE: "Image size should be less then 1 mb",
  IMAGE_TYPE: "Only .png, .jpg, .jpeg file allowed",
};

export const userConstant = {
  USER_UPDATE: "User updated successfully",
  USER_DELETE: "User deleted successfully",
};
