
import express from "express";
const router = express.Router();
import AssetsController from "../controllers/assets_controller";

/**
 * @swagger
 * tags:
 *   name: Assets
 *   description: Assets management
 */


    /**
 * @swagger
 * /assets/getAll:
 *   get:
 *     summary: Get all Assets
 *     description: Retrieve a list of all assets
 *     tags: [Assets]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

router
    .get("/getAll", AssetsController.getAllAssets.bind(AssetsController))




    .get("/", AssetsController.getAssetsByAddress.bind(AssetsController))
    .get("/", AssetsController.getAssetsByPrice.bind(AssetsController))

/**
 * @swagger
 * /assets/:assetById:
 *  get:
 *     summary: Get asset by ID
 *     description: Retrieve asset based on provided ID
 *     tags: [Assets]
 *     requestBody:
 *  
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             items:
 *               type: string
 *             description: String of Asset ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

    .get("/:assetById", AssetsController.getAssetById.bind(AssetsController))

/**
 * @swagger
 * /assets/:
 *   post:
 *     summary: Add an asset
 *     description: Add a new asset
 *     tags: [Assets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asset'
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

  
router.post("/addAsset", AssetsController.createAssetHandler.bind(AssetsController));

/**
 * @swagger
 * /assets/:
 *   delete:
 *     summary: Delete asset 
 *     description: Delete By Id
 *     tags: [Assets]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

router.delete("/", AssetsController.deleteAsset.bind(AssetsController));

/**
 * @swagger
 * /assets/:
 *   put:
 *     summary: Update assets details
 *     description: Update asset based on its ID
 *     tags: [Assets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asset'
 *     parameters:
 *       - in: query
 *         name: assetId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the asset
 *       - in: body
 *         name: assetDetails
 *         description: Updated details of the asset
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *             price:
 *               type: number
 *             fileName:
 *               type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */



router.put("/", AssetsController.updateAsset.bind(AssetsController));

export default router;


