import { Request, Response } from "express";
import { Model } from "mongoose";
import Asset from "../models/assets_model";
import auth from "../common/auth_middleware";


class AssetsController{

    async getAllAssets(req: Request, res: Response) {
        console.log("getAllAssets");
        try {
            const assets = await Asset.find();
            res.send(assets);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getAssetsByAddress(req: Request, res: Response) {
        console.log("getAssetsByAddress");
        try {
            const assets = await Asset.find({address: req.params.address});
            res.send(assets);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getAssetsByPrice(req: Request, res: Response) {
        console.log("getAssetsByPrice");
        try {
            const assets = await Asset.find({price: req.params.price});
            res.send(assets);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

}

export default new AssetsController;