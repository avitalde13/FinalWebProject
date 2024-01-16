import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  assets?: string[];
  id?: string;
  profilePic?: string;
  refreshToken: string[];
}

const userSchema = new mongoose.Schema<IUser>({
  name:{
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "https://www.pngwing.com/en/free-png-zzjjb",
  },
  refreshToken: {
    type: [String],
    default: [],
  },

});

export default mongoose.model<IUser>("User", userSchema);
