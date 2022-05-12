import { ReplyModel } from "../schemas/reply";
import mongoose from "mongoose";

class Reply {
  static addOne(parentComment_id, comment, user_id) {
    if(typeof(parentComment_id) !== "object") { parentComment_id = mongoose.Types.ObjectId(parentComment_id) }

    return ReplyModel.create({
      parentCommentId: parentComment_id,
      comment: comment,
      user: user_id,
    });
  }

  static deleteOne(comment_id, user_id) {
    if(typeof(comment_id) !== "object") { comment_id = mongoose.Types.ObjectId(comment_id) }
    if(typeof(user_id) !== "object") { user_id = mongoose.Types.ObjectId(user_id) }

    return ReplyModel.findOneAndDelete({ _id: comment_id, user: user_id });
  }

  static deleteMany({ parentCommentId, list_comment_id }) {
    if(typeof(parentCommentId) !== "object") { parentCommentId = mongoose.Types.ObjectId(parentCommentId) }
    
    list_comment_id.reduce((pre, item) => {
      if(typeof(item) !== "object") { item = mongoose.Types.ObjectId(list_comment_id) }
      pre.push(item)
      return pre
    }, [])
    
    return ReplyModel.deleteMany({ parentCommentId: parentCommentId, _id: { $in: list_comment_id } });
  }
}

export { Reply };
