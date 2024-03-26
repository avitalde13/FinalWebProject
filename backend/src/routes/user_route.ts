




import express from "express";
const router = express.Router();
import UserController from "../controllers/user_controller";
import  validateToken from "../middleware/authCheck";

/**
 * @swagger
 * tags:
 *   name: Users-Authentication
 *   description: User authentication
 */


/**
 * @swagger
 * /users/getAll:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all users
 *     tags: [Users-Authentication]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */


router
    .get("/getAll", UserController.getAllUsers.bind(UserController))
/**
 * @swagger
    * /users/:
 *   get:
 *     summary: Get user by name
 *     description: Retrieve a user by their name
 *     tags: [Users-Authentication]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the user
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

    .get("/", UserController.getUserByName.bind(UserController))
 
/**
 * @swagger
 * /users/byEmail/{email}:
 *   get:
 *     summary: Get user by email
 *     description: Retrieve a user by their email
 *     tags: [Users-Authentication]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

    .get("/byEmail/:email", UserController.getUserByEmailHandler.bind(UserController))
   
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account
 *     tags: [Users-Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

    .post("/register", UserController.createUserHandler.bind(UserController))


/**
* @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and generate JWT token
 *     tags: [Users-Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
     */
    
    .post("/login", UserController.loginUser.bind(UserController))


/**
 * @swagger 
 * /users/google:
 *   post:
 *     summary: Google sign-in
 *     description: Authenticate a user using Google OAuth
 *     tags: [Users-Authentication]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 * 
     */
    .post("/google", UserController.googleSignIn.bind(UserController))


 /**
 * @swagger
* /users/addAssetToUser:
 *   post:
 *     summary: Add asset to user
 *     description: Add an asset to a user's profile
 *     tags: [Users-Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               assetId:
 *                 type: string
 *             required:
 *               - userId
 *               - assetId
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
     */
    .post("/addAssetToUser", UserController.addAssetToUserHandler.bind(UserController))

    /**
* @swagger
* /users/info:
 *   get:
 *     summary: Get user information
 *     description: Retrieve information about the authenticated user
 *     tags: [Users-Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
     */
    .get("/info", validateToken, UserController.UserInfo.bind(UserController))


/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     description: Update user details by their ID
 *     tags: [Users-Authentication]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
    */
    .put("/:id", UserController.updateUserHandler.bind(UserController))

/**
* @swagger
*  /users/removeAsset:
*   delete:
*     summary: Remove asset from user
 *     description: Remove an asset from a user's profile
 *     tags: [Users-Authentication]
 *     parameters:
 *       - in: query
 *         name: assetId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the asset to remove
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error 
    */

    .delete("/removeAsset", UserController.removeAssetFromUserHandler.bind(UserController))
    
    /**
  * @swagger
    * /users/deleteUser/{id}:
    *   delete:
    *     summary: Delete user
    *     description: Delete a user account by their ID
    *     tags: [Users-Authentication]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: ID of the user to delete
    *     responses:
    *       200:
    *         description: Successful response
    *       500:
    *         description: Internal Server Error
    */
    .delete("/deleteUser/:id", UserController.deleteUserHandler.bind(UserController))


    export default router;

