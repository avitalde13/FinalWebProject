"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_model_1 = __importDefault(require("../models/comment_model"));
class CommentsController {
    getAllComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Comments = yield comment_model_1.default.find();
                res.send(Comments);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    getCommentByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Comments = yield comment_model_1.default.find({ userId: req.params.userId });
                res.send(Comments);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    getCommentByAssetId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Comments = yield comment_model_1.default.find({ assetId: req.params.assetId });
                res.send(Comments);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentBody = {
                    text: req.body.text,
                    assetId: req.body.assetId,
                    userId: req.body.userId
                };
                const comment = new comment_model_1.default(commentBody);
                comment.save();
                res.send(comment);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment_id = req.query.commentId;
                yield comment_model_1.default.findByIdAndDelete(comment_id);
                res.send({ message: "Comment deleted successfully" });
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment_id = req.query.commentId;
            try {
                const CommentBody = {
                    text: req.body.text,
                    assetId: req.body.assetId,
                    userId: req.body.userId
                };
                const comment = yield comment_model_1.default.findByIdAndUpdate({ _id: comment_id }, CommentBody);
                comment.save();
                res.send(comment);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
}
exports.default = new CommentsController;
//# sourceMappingURL=comment_controller.js.map