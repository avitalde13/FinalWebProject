import mongoose from "mongoose";
import { Types } from "mongoose";

export interface IAsset {
  id?: string;
  address: string;
  price: Number;
  fileName: string;
}

const assetSchema = new mongoose.Schema<IAsset>({
  id: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IAsset>("Asset", assetSchema);
