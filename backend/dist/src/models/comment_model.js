"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentScheme = new mongoose_1.default.Schema({
    assetId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: function () {
            const now = new Date();
            now.setHours(now.getHours() + 3);
            return now;
        }
    },
});
const Comment = mongoose_1.default.model("comment", CommentScheme, "comments");
exports.default = Comment;
//# sourceMappingURL=comment_model.js.map