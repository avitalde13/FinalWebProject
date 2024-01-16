import mongoose from "mongoose";

export interface Asset {
  // _id: mongoose.Schema.Types.ObjectId;
  address: string;
  price: Number;
  imgSrc: string;
}

const assetSchema = new mongoose.Schema<Asset>({
  // _id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  // },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgSrc: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Asset>("assets", assetSchema);
