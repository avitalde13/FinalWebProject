import express from "express";
const router = express.Router();
import AssetsController from "../controllers/assets_controller";

router
    .get("/", AssetsController.getAllAssets.bind(AssetsController))
    .get("/", AssetsController.getAssetsByAddress.bind(AssetsController))
    .get("/", AssetsController.getAssetsByPrice.bind(AssetsController))
    .get("/:assetById", AssetsController.getAssetById.bind(AssetsController))

router.post("/", AssetsController.createAssetHandler.bind(AssetsController));
router.delete("/", AssetsController.deleteAsset.bind(AssetsController));
router.put("/", AssetsController.updateAsset.bind(AssetsController));

export default router;
