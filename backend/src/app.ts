import env from "dotenv";
env.config();
import express, { Express } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import assetRoute from "./routes/asset_route";
import commentRoute from "./routes/comment_route";
import userRoute from "./routes/user_route";
import authRoute from "./routes/auth_route";
import  cors from "cors";

const initApp = (): Promise<Express> => {
  const promise = new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    db.once("open", () => console.log("Connected to Database"));
    db.on("error", (error) => console.error(error));
    const url = process.env.DB_URL;
    mongoose.connect(url!).then(() => {
      const app = express();
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(cors());
      app.use("/comments", commentRoute);
      app.use("/assets", assetRoute);
      app.use("/auth", authRoute);
      app.use("/users", userRoute); 
      resolve(app);
    });
  });
  return promise;
};

export default initApp;
