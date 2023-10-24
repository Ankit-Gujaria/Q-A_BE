import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cron from "node-cron";
import routes from "./routes";
import cors from "cors";
import { expireQuestion } from "./scripts/question";
import { errorHandler } from "./helpers/error.helper";
import { dbConnection } from "./configs/db.config";
dotenv.config();

const port = process.env.PORT || 4000;
const app = express();
const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.use("/public", express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(routes);
app.use(errorHandler);
app.use((req: Request, res: Response) => {
  return res.status(404).json({ message: "Route not found." });
});
app.use((req: Request, res: Response) => {
  return res.status(404).json({ message: "Route not found." });
});

// run script run every day at 6am
cron.schedule("0 */2 * * *", expireQuestion);

app.listen(port, () => {
  dbConnection();
  console.log(`Server listening at http://localhost:${port}`);
});
