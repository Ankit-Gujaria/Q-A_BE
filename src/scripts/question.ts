import moment from "moment";
import schemaConstant from "../constants/schema.constant";
import { QuestionModel } from "../models";

export const expireQuestion = async () => {
  // update question status
  const question = await QuestionModel.updateMany(
    {
      expiryDate: {
        $lte: moment(),
      },
      status: schemaConstant.questionStatus.PENDING,
    },
    {
      status: schemaConstant.questionStatus.EXPIRED,
    }
  );
  console.log("Question =>", question);
};
