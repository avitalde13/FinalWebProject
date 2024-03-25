import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import e, { Request, Response, NextFunction } from "express";
import user_model from "../models/user_model";
import User, { IUser } from "../models/user_model";
import { Types } from "mongoose";
import { OAuth2Client } from "google-auth-library";
import  axios from "axios";
import fs from "fs";



const createUser = async (newUser: IUser) => {
    if (newUser) {
        try {
            const { name, email, password, fileName } = newUser;
            if (!name || !email || !password) {
                throw new Error("Name, email and password are required");
            }
            const hashedPassword = bcrypt.hashSync(password, 10);
            newUser.password = hashedPassword;
            newUser.fileName = fileName || "default.jpg";
            const user = new User({ ...newUser });
            await user.save();
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
const createUserHandler = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body.user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}






const deleteUser = async (id: string) => {
    if (id) {
        try {
            const user = await User.findByIdAndDelete(id);
            if (user) {
                return user;
            }
            throw new Error("User not found");
        } catch (error) {
            throw new Error(error.message);
        }
    }
    throw new Error("Id is required");

}




const deleteUserHandler = async (req: Request, res: Response) => {
    try {
        const user = await deleteUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (id: string, user: IUser) => {
    if (id) {
        try {
            const hashedPassword = bcrypt.hashSync(user.password, 10);
            user.password = hashedPassword;
            const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
            if (updatedUser) {
                return updatedUser;
            }
            throw new Error("User not found");
        } catch (error) {
            throw new Error(error.message);
        }
    }
    throw new Error("Id is required");
}

const updateUserHandler = async (req: Request, res: Response) => {
    try {
        const user = await updateUser(req.params.id, req.body.user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addAssetToUser = async (id: Types.ObjectId, asset: Types.ObjectId) => {
    if (id) {
        try {
            const user = await User.findById(id.toString());
            if (user) {
                if (user.assets.includes(asset)) {
                    throw new Error("Asset already exists");
                }
                user.assets.push(asset);
                await updateUser(id.toString(), user);
                return user;
            }
            throw new Error("User not found");
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

const addAssetToUserHandler = async (req: Request, res: Response) => {
    try {
        const user = await addAssetToUser(new Types.ObjectId(req.body.id), new Types.ObjectId(req.body.asset));
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const removeAssetFromUser = async (id: Types.ObjectId, asset: Types.ObjectId) => {
    if (id) {
        try {
            const user = await User.findById(id.toString());
            if (user) {
                if (!user.assets.includes(asset)) {
                    throw new Error("Asset does not exist");
                }
                user.assets = user.assets.filter((assetId) => assetId.toString() !== asset.toString());
                await updateUser(id.toString(), user);
                return user;
            }
            throw new Error("User not found");
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}

const removeAssetFromUserHandler = async (req: Request, res: Response) => {
    try {
        // const token = req.headers["Authorization"];
        const user = await removeAssetFromUser(new Types.ObjectId(req.body.id), new Types.ObjectId(req.body.asset)); // add tokens and then can use params instead of body .
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const loginUser = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send("missing username or password");
    }    
    
    try {
        
        const user = await User.findOne({email: email });
        if (user == null) {
            return res.status(401).send("username or password incorrect");
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send("username or password incorrect");
        } 
        const today = new Date();
        const token = jwt.sign({ id: user._id, createDate: today }, process.env.JWT_SECRET);
        return res.status(200).send({ 'accessToken': token });
    } catch (err) {
        return res.status(400).send("error missing username or password");

    }
}
const UserInfo = async (req: Request, res: Response) => {
    try {
        const userid = req.body.userId;
        const user = (await User.findOne({ _id:  userid  }));
        return res.status(200).send( user );
    } catch (err) {
        return res.status(400).send("failed to get user info");
    }
}



const getAllUsers = async (req: Request, res: Response) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}



const getUserByName = async (name: string) => {
    if (name) {
        try {
            const user = await User.findOne({ name });
            if (user) {
                return user;
            }
            return null;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    throw new Error("Name is required");
};



const getUserByEmail = async (email: string) => {
    if (email) {
        try {
            const user = await User.findOne({ email });
            if (user) {
                return user;
            }
            return null;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    throw new Error("Email is required");
};

const getUserByEmailHandler = async (req: Request, res: Response) => {
    try {
        const user = await getUserByEmail(req.params.email);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const client = new OAuth2Client();
const googleSignIn = async (req: Request, res: Response) => {
    try{
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const gmail = payload?.email;
        

        // const photo = axios.get(payload?.picture);
        axios({
            method: "get",
            url: payload?.picture,
            responseType: "stream"
        }).then(function (response) {
            response.data.pipe(fs.createWriteStream("public/" + payload?.email.split("@")[0] + ".png"));
        });

        if(gmail != null  ){
            const user = await User.findOne({ email: gmail })
            if (user == null) {
                const newUser: IUser = {
                    email: gmail,
                    password: "password",
                    name: payload?.name,
                    fileName: payload?.email.split("@")[0] + ".png"
                }
                const myuser = new User({ ...newUser });
                await myuser.save();
               
                const token = jwt.sign({ id: myuser._id }, process.env.JWT_SECRET);
                res.status(200).json({ 'accessToken': token });
            } else {
                
                res.status(400).send({message: "User already exists"});
            }
        }
        else{
            res.status(400).send("failed to sign in with google");
        }
    }catch(err){
        console.log(err)
        res.status(400).send("failed to sign in with google");
    }





}


export default {
    getAllUsers,
    getUserByName,
    getUserByEmailHandler,
    createUserHandler,
    deleteUserHandler,
    updateUserHandler,
    addAssetToUserHandler,
    removeAssetFromUserHandler,
    loginUser,
    UserInfo,
    googleSignIn
};
