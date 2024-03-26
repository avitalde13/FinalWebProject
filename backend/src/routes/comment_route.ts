/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comments management
 */


import express from "express";
const router = express.Router();
import CommentController from "../controllers/comment_controller";


/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     description: Retrieve all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/", CommentController.getAllComments.bind(CommentController));

/**
 * @swagger
* /comments/user:
 *   get:
 *     summary: Get comments by user ID
 *     description: Retrieve comments associated with a specific user
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
    */

router.get("/user", CommentController.getCommentByUserId.bind(CommentController));

/**
 * @swagger
 * /comments/asset:
 *   get:
 *     summary: Get comments by asset ID
 *     description: Retrieve comments associated with a specific asset
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: assetId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the asset
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/asset", CommentController.getCommentByAssetId.bind(CommentController));


/**
 * @swagger
 * /comments/addComment:
 *   post:
 *     summary: Add a comment
 *     description: Add a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               textComment:
 *                 type: string
 *               assetId:
 *                 type: string
 *               userId:
 *                 type: string
 *             required:
 *               - textComment
 *               - assetId
 *               - userId
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

router.post("/addComment", CommentController.createComment.bind(CommentController));

/**
 * @swagger
 * /comments/delete:
 *   delete:
 *     summary: Delete a comment
 *     description: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.delete("/delete", CommentController.deleteComment.bind(CommentController));

/**
 * @swagger
 * /comments/update:
 *   put:
 *     summary: Update a comment
 *     description: Update a comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentId:
 *                 type: string
 *               textComment:
 *                 type: string
 *             required:
 *               - commentId
 *               - textComment
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

router.put("/", CommentController.updateComment.bind(CommentController));

export default router;
