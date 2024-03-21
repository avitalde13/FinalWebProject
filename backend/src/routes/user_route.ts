import express from "express";
const router = express.Router();
import UserController from "../controllers/user_controller";
import  validateToken from "../middleware/authCheck";

router
    .get("/getAll", validateToken, UserController.getAllUsers)
    .get("/:id", UserController.getUserById.bind(UserController))
    // .get("/", UserController.getUserByName.bind(UserController))
    // .get("/byEmail/:email", UserController.getUserByEmailHandler.bind(UserController))
    .post("/register", UserController.createUserHandler.bind(UserController))
    .delete("/deleteUser/:id", UserController.deleteUserHandler.bind(UserController))
    .put("/:id", UserController.updateUserHandler.bind(UserController))
    .post("/addAssetToUser", UserController.addAssetToUserHandler.bind(UserController))
    .delete("/removeAsset", UserController.removeAssetFromUserHandler.bind(UserController))
    .post("/login", UserController.loginUser.bind(UserController))
    .get("/info", validateToken, UserController.UserInfo.bind(UserController))
    export default router;
