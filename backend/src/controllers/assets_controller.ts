import { Request, Response } from "express";
import { Model } from "mongoose";
import Asset from "../models/assets_model";
import auth from "../common/auth_middleware";


class AssetsController{

    async getAllAssets(req: Request, res: Response) {
    
        try {
            const assets = await Asset.find();
            res.send(assets);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getAssetsByAddress(req: Request, res: Response) {
    
        try {
            const assets = await Asset.find({address: req.params.address});
            res.send(assets);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getAssetsByPrice(req: Request, res: Response) {
    
        try {
            const assets = await Asset.find({price: req.params.price});
            res.send(assets);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


    async getAssetById(req: Request, res: Response) {
    
        try {
            const assets = await Asset.findOne({_id: req.params.assetById});
            res.send(assets);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async createAsset(req: Request, res: Response) {
     
        try {
            const assetBody = {
                address: req.body.address,
                price: req.body.price,
                imgSrc: req.body.imgSrc
            }
            const asset = new Asset(assetBody);
            asset.save();
            res.send(asset);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    async deleteAsset(req: Request, res: Response) {

        try {
            const asset_id = req.query.assetId
            
             await Asset.findByIdAndDelete(asset_id);
            res.send({message: "Asset deleted successfully"});
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async updateAsset(req: Request, res: Response) {
     
        const asset_id = req.query.assetId
        try {
            const assetBody = {
                address: req.body.address,
                price: req.body.price,
                imgSrc: req.body.imgSrc
            }
            const asset = await Asset.findByIdAndUpdate(
                {_id: asset_id},
                 assetBody
            );
            asset.save();
            res.send(asset);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    


}

export default new AssetsController;