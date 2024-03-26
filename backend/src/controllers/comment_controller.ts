import { Request, Response } from "express";
import { Model } from "mongoose";
import Comment from "../models/comment_model";

import User from "../models/user_model";
import auth from "../common/auth_middleware";


class CommentsController {

    async getAllComments(req: Request, res: Response) {
        try {
            const Comments = await Comment.find();
            res.send(Comments);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getCommentByUserId(req: Request, res: Response) {
        try {
            const userId = req.query.userId.toString();
            const Comments = await Comment.find({ userId: userId });
            res.send(Comments);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getCommentByAssetId(req: Request, res: Response) {

        try {
            const assetId = req.query.assetId.toString();
            const Comments = await Comment.find({ assetId: assetId });
            res.send(Comments);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async createComment(req: Request, res: Response) {
        try {
            const userName = (await User.findOne({ _id:  req.body.userId  })).name;
            const commentBody = {
                text: req.body.textComment,
                assetId: req.body.assetId,
                userId: req.body.userId,
                userName: userName
            }
            const comment = new Comment(commentBody);
            comment.save();
            res.send(comment);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    async deleteComment(req: Request, res: Response) {
        try {
            const comment_id = req.query.commentId

            await Comment.findByIdAndDelete(comment_id);
            res.send({ message: "Comment deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async updateComment(req: Request, res: Response) {
        const comment_id = req.query.commentId
        try {
            const CommentBody = {
                text: req.body.text,
                assetId: req.body.assetId,
                userId: req.body.userId
            }
            const comment = await Comment.findByIdAndUpdate(
                { _id: comment_id },
                CommentBody
            );
            comment.save();
            res.send(comment);
            
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


}

export default new CommentsController;