"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const assetSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model("Asset", assetSchema);
//# sourceMappingURL=assets_model.js.map