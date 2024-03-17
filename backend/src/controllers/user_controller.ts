import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import user_model from "../models/user_model";
import User, { IUser } from "../models/user_model";
import { Types } from "mongoose";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const user = await User.find();
        // res.status(200).json(users);
        res.send(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        res.status(200).json(User);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




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



// const getUserDetails = async (req:Request, res:Response) => {
//   try {
//     const { token } = req.body;
//     const decodedToken = jwt.decode(token);
//     const userId = decodedToken.id;
//     const user = await User.findById(req.params.userId);
//     //delete password key from user object
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

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
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send("missing username or password");
    }    
    try {
        
        const user = await User.findOne({email: email });
        console.log(user);
        if (user == null) {
            return res.status(401).send("username or password incorrect");
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send("username or password incorrect");
        } 
        const today = new Date();
        const token = await jwt.sign({ id: user._id, createDate: today}, process.env.JWT_SECRET);
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




// const addSongsToUser = async (id:ObjectId, songs:ObjectId[]) => { // IS IT SONG []  OR SONGS ID [] ??? SONG/ObjectId
//     if (id) {
//       try {
//         const user = await User.findById(id);
//         if (user) {
//           for (let i = 0; i < songs.length; i++) {
//             user.songs.push(songs[i]);
//           }
//           await updateUser(id, user);
//           return user;
//         }
//         throw new Error("User not found");
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     }
//   };

// const addSongToUser = async (req:Request, res:Response) => {
//   try {
//     const user = await userService.addSongsToUser(req.params.id, req.body);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// const removeRefreshTokens = async (id:ObjectId) => {
//     if(id){
//       try{
//         const user = await User.findById(id);
//         if(user){
//           user.refreshTokens = [];
//           await updateUser(id, user);
//           return user;
//         }
//         throw new Error("User not found");
//       }catch(error){
//         throw new Error(error.message);
//       }
//     }
//   }


// const removeRefreshToken = async (id:ObjectId, refreshToken:string) => { // Refresh token is string or id?
//     if(id && refreshToken){
//       try{
//         const user = await User.findById(id);
//         if(user){
//           user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
//           await updateUser(id, user);
//           return user;
//         }
//         throw new Error("User not found");
//       }catch(error){
//         throw new Error(error.message);
//       }
//     }
//   }

//   const addRefreshToken = async (id:ObjectId, refreshToken:string) => {
//     if(id && refreshToken){
//       try{
//         const user = await User.findById(id);
//         if(user){
//           user.refreshTokens.push(refreshToken);
//           await updateUser(id, user);
//           return user;
//         }
//         throw new Error("User not found");
//       }catch(error){
//         throw new Error(error.message);
//       }
//     }
//   }




// const removeSongFromUser = async (req:Request, res:Response) => {
//   try {
//     const user = await userService.removeSongFromUser(req.params.id, req.body);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const userLogin = async (req:Request, res:Response) => {
//   try {
//     const user = await getUserByEmail(req.body.email.toLowerCase());
//     if (!user) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }
//     if (!bcrypt.compareSync(req.body.password, user.password)) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.TOKEN_EXPIRATION_TIME,
//     });
//     const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
//     });
//     userService.addRefreshToken(user._id, refreshToken);
//     res.status(200).json({ token: token, refreshToken: refreshToken });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const checkSong = async (req:Request, res:Response) => {
//   try {
//     const { token } = req.body;
//     const { songId } = req.params;
//     const decodedToken = jwt.decode(token);
//     const user = await getUserById(decodedToken.id);
//     const song = user.songs.find((song) => song._id == songId);
//     if (song) {
//       res.status(200).json({ isExist: true });
//     } else {
//       res.status(200).json({ isExist: false });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const createGoogleUser = async (user:IUser) => {
//     if (user) {
//       try {
//         const { name, email, profile_image } = user;
//         user["password"] = name + email;
//         if (!name || !email) {
//           throw new Error("Name and email are required");
//         }
//         const newUser = new User({ ...user });
//         await newUser.save();
//         return newUser;
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     }
//   };


// const googleLogin = async (req:Request, res:Response) => {
//   try {
//     let user = await userService.getUserByEmail(req.body.email.toLowerCase());
//     if (!user) {
//       const newUser = {
//         name: req.body.name,
//         email: req.body.email.toLowerCase(),
//         password: req.body.name + req.body.email.toLowerCase(),
//         profile_image: req.body.profile_image,
//       };
//       const createdUser = await userService.createGoogleUser(newUser);
//       if (!createdUser) {
//         return res.status(500).json({ message: "Something went wrong" });
//       }
//       user = createdUser;
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.TOKEN_EXPIRATION_TIME,
//     });
//     return res.status(200).json({ token: token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const checkToken = (req:Request, res:Response) => {
//   return res.status(200).json({ isValidToken: true });
// };

// const isRefreshTokenExist = async (req:Request, res:Response,next:NextFunction) => { 
//   try {
//     const { refreshToken } = req.body;
//     const decodedToken = jwt.decode(refreshToken);
//     const user = await userService.getUserById(decodedToken.id);
//     if (!user) {
//       return res.status(403).json({ message: "Invalid token" });
//     }
//     const isTokenExist = user.refreshTokens.find(
//       (token) => token === refreshToken
//     );
//     if (!isTokenExist) {
//       await userService.removeRefreshTokens(user._id);
//       return res.status(403).json({ message: "Invalid token" });
//     }
//     next();
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// const verifyRefreshToken = async (req:Request, res:Response, next:NextFunction) => {
//   const { refreshToken } = req.body;
//   const decodedToken = jwt.decode(refreshToken);
//   const user = await userService.getUserById(decodedToken.id);
//   jwt.verify(refreshToken, process.env.JWT_SECRET, (err:Error) => {
//     if (err) {
//       //refreshToken is valid!! but expired
//       userService.removeRefreshToken(user._id, refreshToken);
//       const newRefreshToken = jwt.sign(
//         { id: user._id },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
//         }
//       );
//       userService.addRefreshToken(user._id, newRefreshToken);
//       req.body.refreshToken = newRefreshToken;
//     }
//     next();
//   });
// };

// const generateAccessToken = async (req:Request, res:Response) => {
//   try {
//     const { refreshToken } = req.body;
//     const decodedToken = jwt.decode(refreshToken);
//     const user = await userService.getUserById(decodedToken.id);
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.TOKEN_EXPIRATION_TIME,
//     });
//     res.status(200).json({ token: token, refreshToken: refreshToken });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
//  // token??
// const logout = async (req:Request, res:Response) => {
//   try {
//     const { refreshToken } = req.body;
//     const decodedToken = jwt.decode(token);
//     const userId = decodedToken.id;
//     await userService.removeRefreshToken(userId, refreshToken);
//     res.status(200).json({ message: "Logout successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

export default {
    getAllUsers,
    getUserById,
    getUserByName,
    getUserByEmailHandler,
    //   getUserDetails,
    createUserHandler,
    
    deleteUserHandler,
    updateUserHandler,
    addAssetToUserHandler,
    removeAssetFromUserHandler,
    loginUser,
    UserInfo,
    //   removeSongFromUser,
    //   userLogin,
    //   checkSong,
    //   googleLogin,
    //   checkToken,
    //   isRefreshTokenExist,
    //   verifyRefreshToken,
    //   generateAccessToken,
    //   logout,
    //   addSongsToUser,
    //   createGoogleUser,
    //   removeRefreshTokens,
    //   removeRefreshToken,
    //   addRefreshToken
};
