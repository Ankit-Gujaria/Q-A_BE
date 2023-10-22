import { json } from "body-parser";
import { UserData } from "./user.type";

declare global {
  namespace Express {
    interface Request {
      userData: UserData;
    }
    interface Response {
      success: boolean;
      message: any;
      data: any;
    }
  }
}
