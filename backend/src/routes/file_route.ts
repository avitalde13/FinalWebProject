import express from "express";
import FileController from "../controllers/file_controller";
import upload from "../middleware/upload";
const router = express.Router();



// const base = "http://" + process.env.DOMAIN_BASE + ":" + process.env.PORT + "/";

router.post("/", upload.single('file'), FileController.fileUpload.bind(FileController))
router.get("/", FileController.fileDownload.bind(FileController))
export = router;