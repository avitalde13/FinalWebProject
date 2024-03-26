import env from "dotenv";
env.config();
import express, { Express } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import assetRoute from "./routes/asset_route";
import commentRoute from "./routes/comment_route";
import userRoute from "./routes/user_route";

import fileRoute from "./routes/file_route";
import  cors from "cors";



const app = express();

const connectDB =  () => {
  try {
     
      mongoose.connect(process.env.DB_URL!);
      mongoose.connection.once('open', () => {
          console.log('MongoDB connected');
      });
  } catch (error) {
      // console.log(error.message);
      process.exit(1);
  }
}
connectDB();

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
      });

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(cors());
      app.use("/comments", commentRoute);
      app.use("/assets", assetRoute);
      app.use("/users", userRoute); 
      app.use ("/file", fileRoute);
      app.use ("/public", express.static("public"));
  



    export{ app, connectDB};



