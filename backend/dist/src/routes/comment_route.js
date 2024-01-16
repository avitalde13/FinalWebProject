"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const comment_controller_1 = __importDefault(require("../controllers/comment_controller"));
router.get("/", comment_controller_1.default.getAllComments.bind(comment_controller_1.default));
router.get("/user", comment_controller_1.default.getCommentByUserId.bind(comment_controller_1.default));
router.get("/asset", comment_controller_1.default.getCommentByAssetId.bind(comment_controller_1.default));
router.post("/", comment_controller_1.default.createComment.bind(comment_controller_1.default));
router.delete("/", comment_controller_1.default.deleteComment.bind(comment_controller_1.default));
router.put("/", comment_controller_1.default.updateComment.bind(comment_controller_1.default));
exports.default = router;
//# sourceMappingURL=comment_route.js.map