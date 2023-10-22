import mongoose, { ConnectOptions } from "mongoose";

export const dbConnection = () => {
  // Connect to MongoDB database
  const dbURL = process.env.DB_URL;
  const dbOptions: ConnectOptions & {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
  } = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(dbURL, dbOptions)
    .then(() => {
      console.log("Connected to MongoDB database!");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB database: ", error);
      return;
    });
};
