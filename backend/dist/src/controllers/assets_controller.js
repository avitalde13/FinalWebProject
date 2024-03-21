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
const getAllAssets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assets = yield assets_model_1.default.find();
        res.send(assets);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const getAssetsByAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assets = yield assets_model_1.default.find({ address: req.params.address });
        res.send(assets);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const getAssetsByPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assets = yield assets_model_1.default.find({ price: req.params.price });
        res.send(assets);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const getAssetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assets = yield assets_model_1.default.findOne({ _id: req.params.assetById });
        res.send(assets);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const createAsset = (newAsset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address, price, fileName } = newAsset;
        if (!address || !price || !fileName) {
            throw new Error("Please provide all the required fields");
        }
        const asset = new assets_model_1.default(Object.assign({}, newAsset));
        yield asset.save();
        return asset;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
const createAssetHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asset = yield createAsset(req.body.asset);
        res.status(200).json(asset);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const deleteAsset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asset_id = req.query.assetId;
        yield assets_model_1.default.findByIdAndDelete(asset_id);
        res.send({ message: "Asset deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const updateAsset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const asset_id = req.query.assetId;
    try {
        const assetBody = {
            address: req.body.address,
            price: req.body.price,
            imgSrc: req.body.imgSrc
        };
        const asset = yield assets_model_1.default.findByIdAndUpdate({ _id: asset_id }, assetBody);
        asset.save();
        res.send(asset);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.default = {
    getAllAssets,
    getAssetsByAddress,
    getAssetsByPrice,
    getAssetById,
    createAsset,
    createAssetHandler,
    deleteAsset,
    updateAsset
};
//# sourceMappingURL=assets_controller.js.map