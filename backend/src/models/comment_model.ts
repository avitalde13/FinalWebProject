import mongoose,{ObjectId,Types} from "mongoose"
export interface IComment{
  assetId:string,
  userId:string,
  text:string,
  date?:Date
}

const CommentScheme = new mongoose.Schema<IComment>({
  assetId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: function () {
      const now = new Date();
      now.setHours(now.getHours() + 3);
      return now;
    }
  },
});

const Comment = mongoose.model<IComment>("comment", CommentScheme, "comments");
export default Comment