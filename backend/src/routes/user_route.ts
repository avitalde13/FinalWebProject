import express from "express";
const router = express.Router();
import UserController from "../controllers/user_controller";
import  validateToken from "../middleware/authCheck";

router
    .get("/getAll", UserController.getAllUsers.bind(UserController))
    .get("/", UserController.getUserByName.bind(UserController))
    .get("/byEmail/:email", UserController.getUserByEmailHandler.bind(UserController))
   

    .post("/register", UserController.createUserHandler.bind(UserController))
    .post("/login", UserController.loginUser.bind(UserController))
    .post("/google", UserController.googleSignIn.bind(UserController))
    .post("/addAssetToUser", UserController.addAssetToUserHandler.bind(UserController))
    .get("/info", validateToken, UserController.UserInfo.bind(UserController))

    .put("/:id", UserController.updateUserHandler.bind(UserController))

    .delete("/removeAsset", UserController.removeAssetFromUserHandler.bind(UserController))
    .delete("/deleteUser/:id", UserController.deleteUserHandler.bind(UserController))


    export default router;

