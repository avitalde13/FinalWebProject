import mongoose,{ObjectId,Types} from "mongoose"
export interface IComment{
  assetId:string,
  userId:string,
  userName:string,
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
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  date: {
    type: Date,
    default: function () {
      const now = new Date();
      now.setHours(now.getHours() + 3);
      return now;
    }
  },
  userName: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model<IComment>("comment", CommentScheme, "comments");
export default Comment