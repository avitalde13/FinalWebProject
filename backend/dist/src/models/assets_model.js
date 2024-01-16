"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const assetSchema = new mongoose_1.default.Schema({
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
    address: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imgSrc: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model("assets", assetSchema);
//# sourceMappingURL=assets_model.js.map