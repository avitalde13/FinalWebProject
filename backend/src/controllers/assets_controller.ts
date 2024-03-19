import { Request, Response } from "express";
import { Model } from "mongoose";
import Asset, { IAsset } from "../models/assets_model";
import auth from "../common/auth_middleware";


   const getAllAssets = async (req: Request, res: Response) => {

        try {
            const assets = await Asset.find();
            res.send(assets);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };


    const getAssetsByAddress=  async(req: Request, res: Response) => {
    
        try {
            const assets = await Asset.find({address: req.params.address});
            res.send(assets);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    const getAssetsByPrice= async (req: Request, res: Response) => {
    
        try {
            const assets = await Asset.find({price: req.params.price});
            res.send(assets);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };


    const getAssetById= async (req: Request, res: Response) => {
    
        try {
            const assets = await Asset.findOne({_id: req.params.assetById});
            res.send(assets);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };



    const createAsset= async(newAsset: IAsset)=>{
        try{
            const {address, price, fileName} = newAsset;
            if (!address || !price || !fileName) {
                throw new Error("Please provide all the required fields");
            }
            const asset = new Asset({...newAsset});
            await asset.save();
            return asset;
        }catch(err){    
            throw new Error(err.message);
        }
    }

    const createAssetHandler = async(req: Request, res: Response) => {
        try {
            const asset = await createAsset(req.body.asset);
            res.status(200).json(asset);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    // const createAsset= async(req: Request, res: Response) => {
    //     try {
    //         const assetBody = {
    //             address: req.body.address,
    //             price: req.body.price,
    //             imgSrc: req.body.imgSrc
    //         }
    //         console.log(assetBody);
    //         const asset = new Asset(assetBody);
    //         console.log(asset); 
    //         asset.save();
    //         res.send(asset);
    //     } catch (err) {
    //         res.status(500).json({ message: err.message });
    //     }
    // };
    const deleteAsset = async(req: Request, res: Response) => {

        try {
            const asset_id = req.query.assetId
            
             await Asset.findByIdAndDelete(asset_id);
            res.send({message: "Asset deleted successfully"});
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    const updateAsset= async(req: Request, res: Response) => {
     
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
    };

    

export default {
    getAllAssets,
    getAssetsByAddress,
    getAssetsByPrice,
    getAssetById,
    createAssetHandler,
    // createAsset,
    deleteAsset,
    updateAsset
};