"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
const authCheck_1 = __importDefault(require("../middleware/authCheck"));
router
    .get("/", authCheck_1.default, user_controller_1.default.getAllUsers)
    .get("/", user_controller_1.default.getUserById.bind(user_controller_1.default))
    .get("/", user_controller_1.default.getUserByName.bind(user_controller_1.default))
    .get("/byEmail/:email", user_controller_1.default.getUserByEmailHandler.bind(user_controller_1.default))
    .post("/", user_controller_1.default.createUserHandler.bind(user_controller_1.default))
    .delete("/:id", user_controller_1.default.deleteUserHandler.bind(user_controller_1.default))
    .put("/:id", user_controller_1.default.updateUserHandler.bind(user_controller_1.default))
    .post("/addAsset", user_controller_1.default.addAssetToUserHandler.bind(user_controller_1.default))
    .delete("/removeAsset", user_controller_1.default.removeAssetFromUserHandler.bind(user_controller_1.default))
    .post("/login", user_controller_1.default.loginUser.bind(user_controller_1.default))
    .get("/info", authCheck_1.default, user_controller_1.default.UserInfo.bind(user_controller_1.default));
exports.default = router;
//# sourceMappingURL=user_route.js.map