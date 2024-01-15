"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assets_model_1 = __importDefault(require("../models/assets_model"));
class AssetsController {
    getAllAssets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getAllAssets");
            try {
                const assets = yield assets_model_1.default.find();
                res.send(assets);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    getAssetsByAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getAssetsByAddress");
            try {
                const assets = yield assets_model_1.default.find({ address: req.params.address });
                res.send(assets);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    getAssetsByPrice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getAssetsByPrice");
            try {
                const assets = yield assets_model_1.default.find({ price: req.params.price });
                res.send(assets);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
}
exports.default = new AssetsController;
//# sourceMappingURL=assets_controller.js.map