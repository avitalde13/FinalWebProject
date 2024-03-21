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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user_model"));
const mongoose_1 = require("mongoose");
const createUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (newUser) {
        try {
            const { name, email, password, fileName } = newUser;
            if (!name || !email || !password) {
                throw new Error("Name, email and password are required");
            }
            const hashedPassword = bcrypt_1.default.hashSync(password, 10);
            newUser.password = hashedPassword;
            newUser.fileName = fileName || "default.jpg";
            const user = new user_model_1.default(Object.assign({}, newUser));
            yield user.save();
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
});
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield createUser(req.body.user);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id) {
        try {
            const user = yield user_model_1.default.findByIdAndDelete(id);
            if (user) {
                return user;
            }
            throw new Error("User not found");
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    throw new Error("Id is required");
});
const deleteUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield deleteUser(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const updateUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (id) {
        try {
            const hashedPassword = bcrypt_1.default.hashSync(user.password, 10);
            user.password = hashedPassword;
            const updatedUser = yield user_model_1.default.findByIdAndUpdate(id, user, { new: true });
            if (updatedUser) {
                return updatedUser;
            }
            throw new Error("User not found");
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    throw new Error("Id is required");
});
const updateUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield updateUser(req.params.id, req.body.user);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const addAssetToUser = (id, asset) => __awaiter(void 0, void 0, void 0, function* () {
    if (id) {
        try {
            const user = yield user_model_1.default.findById(id.toString());
            if (user) {
                if (user.assets.includes(asset)) {
                    throw new Error("Asset already exists");
                }
                user.assets.push(asset);
                yield updateUser(id.toString(), user);
                return user;
            }
            throw new Error("User not found");
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
});
const addAssetToUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield addAssetToUser(new mongoose_1.Types.ObjectId(req.body.id), new mongoose_1.Types.ObjectId(req.body.asset));
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const removeAssetFromUser = (id, asset) => __awaiter(void 0, void 0, void 0, function* () {
    if (id) {
        try {
            const user = yield user_model_1.default.findById(id.toString());
            if (user) {
                if (!user.assets.includes(asset)) {
                    throw new Error("Asset does not exist");
                }
                user.assets = user.assets.filter((assetId) => assetId.toString() !== asset.toString());
                yield updateUser(id.toString(), user);
                return user;
            }
            throw new Error("User not found");
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
});
const removeAssetFromUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const token = req.headers["Authorization"];
        const user = yield removeAssetFromUser(new mongoose_1.Types.ObjectId(req.body.id), new mongoose_1.Types.ObjectId(req.body.asset)); // add tokens and then can use params instead of body .
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send("missing username or password");
    }
    try {
        const user = yield user_model_1.default.findOne({ email: email });
        console.log(user);
        if (user == null) {
            return res.status(401).send("username or password incorrect");
        }
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match) {
            return res.status(401).send("username or password incorrect");
        }
        const today = new Date();
        const token = yield jsonwebtoken_1.default.sign({ id: user._id, createDate: today }, process.env.JWT_SECRET);
        return res.status(200).send({ 'accessToken': token });
    }
    catch (err) {
        return res.status(400).send("error missing username or password");
    }
});
const UserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.body.userId;
        const user = (yield user_model_1.default.findOne({ _id: userid }));
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(400).send("failed to get user info");
    }
});
// const getAllUsers = async (req: Request, res: Response) => {
//     try {
//         const user = await User.find();
//         res.status(200).json(user);
//         res.send(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
// const getUserById = async (req: Request, res: Response) => {
//     try {
//         const userId = req.params.userId;
//         res.status(200).json(User);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
// const getUserByName = async (name: string) => {
//     if (name) {
//         try {
//             const user = await User.findOne({ name });
//             if (user) {
//                 return user;
//             }
//             return null;
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }
//     throw new Error("Name is required");
// };
// const getUserByEmail = async (email: string) => {
//     if (email) {
//         try {
//             const user = await User.findOne({ email });
//             if (user) {
//                 return user;
//             }
//             return null;
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }
//     throw new Error("Email is required");
// };
// const getUserByEmailHandler = async (req: Request, res: Response) => {
//     try {
//         const user = await getUserByEmail(req.params.email);
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
exports.default = {
    // getAllUsers,
    // getUserById,
    // getUserByName,
    // getUserByEmailHandler,
    createUserHandler,
    deleteUserHandler,
    updateUserHandler,
    addAssetToUserHandler,
    removeAssetFromUserHandler,
    loginUser,
    UserInfo,
};
//# sourceMappingURL=user_controller.js.map