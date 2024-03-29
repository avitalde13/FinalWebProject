import { Request, Response } from "express";
import { Model } from "mongoose";
import Comment from "../models/comment_model";
import auth from "../common/auth_middleware";
import  upload from "../middleware/upload";


class FileController{
    async fileUpload(req: Request, res: Response) {
        try {
            res.json({ message: 'File uploaded successfully!' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async fileDownload(req: Request, res: Response) {
        try {
            const file = "public/" + req.query.file;
            res.download(file)
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


}

export default new FileController;