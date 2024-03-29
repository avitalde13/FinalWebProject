"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const asset_route_1 = __importDefault(require("./routes/asset_route"));
const comment_route_1 = __importDefault(require("./routes/comment_route"));
const user_route_1 = __importDefault(require("./routes/user_route"));
const auth_route_1 = __importDefault(require("./routes/auth_route"));
const file_route_1 = __importDefault(require("./routes/file_route"));
const cors_1 = __importDefault(require("cors"));
const initApp = () => {
    const promise = new Promise((resolve) => {
        const db = mongoose_1.default.connection;
        db.once("open", () => console.log("Connected to Database"));
        db.on("error", (error) => console.error(error));
        const url = process.env.DB_URL;
        mongoose_1.default.connect(url).then(() => {
            const app = (0, express_1.default)();
            app.use(body_parser_1.default.json());
            app.use(body_parser_1.default.urlencoded({ extended: true }));
            app.use((req, res, next) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Methods", "*");
                res.header("Access-Control-Allow-Headers", "*");
                res.header("Access-Control-Allow-Credentials", "true");
                next();
            });
            app.use(body_parser_1.default.json());
            app.use(body_parser_1.default.urlencoded({ extended: true }));
            app.use((0, cors_1.default)());
            app.use("/comments", comment_route_1.default);
            app.use("/assets", asset_route_1.default);
            app.use("/auth", auth_route_1.default);
            app.use("/users", user_route_1.default);
            app.use("/file", file_route_1.default);
            app.use("/public", express_1.default.static("public"));
            resolve(app);
        });
    });
    return promise;
};
exports.default = initApp;
//# sourceMappingURL=app.js.map