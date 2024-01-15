import mongoose from "mongoose";

export interface Asset {
  _id: mongoose.Schema.Types.ObjectId;
  address: string;
  price: string;
  imgSrc: string;
}

const assetSchema = new mongoose.Schema<Asset>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  imgSrc: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Asset>("assets", assetSchema);
