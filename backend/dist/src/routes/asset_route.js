"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const assets_controller_1 = __importDefault(require("../controllers/assets_controller"));
router
    .get("/", assets_controller_1.default.getAllAssets.bind(assets_controller_1.default))
    .get("/", assets_controller_1.default.getAssetsByAddress.bind(assets_controller_1.default))
    .get("/", assets_controller_1.default.getAssetsByPrice.bind(assets_controller_1.default))
    .get("/:assetById", assets_controller_1.default.getAssetById.bind(assets_controller_1.default));
router.post("/addAsset", assets_controller_1.default.createAssetHandler.bind(assets_controller_1.default));
router.delete("/", assets_controller_1.default.deleteAsset.bind(assets_controller_1.default));
router.put("/", assets_controller_1.default.updateAsset.bind(assets_controller_1.default));
exports.default = router;
//# sourceMappingURL=asset_route.js.map