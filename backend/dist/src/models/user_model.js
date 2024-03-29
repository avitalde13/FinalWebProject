"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    assets: {
        type: [
            {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Asset",
            }
        ],
        default: [],
    },
    imgUrl: {
        type: String,
        default: "https://www.pngwing.com/en/free-png-zzjjb",
    },
    refreshToken: {
        type: [String],
        default: [],
    },
});
exports.default = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=user_model.js.map