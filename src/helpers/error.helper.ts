import { Request, Response, NextFunction } from "express";
import { isCelebrateError } from "celebrate";
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line consistent-return
): Response => {
  if (isCelebrateError(error)) {
    let errorDetails = null;
    if (error.details.get("body")) {
      const { details } = error.details.get("body");
      errorDetails = details;
    }
    if (error.details.get("query")) {
      const { details } = error.details.get("query");
      errorDetails = details;
    }
    if (error.details.get("params")) {
      const { details } = error.details.get("query");
      errorDetails = details;
    }
    if (errorDetails) {
      const message = errorDetails
        .map((i: { message: string }) => i.message.replace(/['"]+/g, ""))
        .join(",");
      return res.status(400).send({
        success: false,
        message,
        data: null,
      });
    }
  }
  next();
};
