"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const file_controller_1 = __importDefault(require("../controllers/file_controller"));
const upload_1 = __importDefault(require("../middleware/upload"));
const router = express_1.default.Router();
// const base = "http://" + process.env.DOMAIN_BASE + ":" + process.env.PORT + "/";
router.post("/", upload_1.default.single('file'), file_controller_1.default.fileUpload.bind(file_controller_1.default));
router.get("/", file_controller_1.default.fileDownload.bind(file_controller_1.default));
module.exports = router;
//# sourceMappingURL=file_route.js.map