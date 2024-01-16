import express from "express";
const router = express.Router();
import CommentController from "../controllers/comment_controller";

router.get("/", CommentController.getAllComments.bind(CommentController));
router.get("/user", CommentController.getCommentByUserId.bind(CommentController));
router.get("/asset", CommentController.getCommentByAssetId.bind(CommentController));


router.post("/", CommentController.createComment.bind(CommentController));
router.delete("/", CommentController.deleteComment.bind(CommentController));
router.put("/", CommentController.updateComment.bind(CommentController));

export default router;
