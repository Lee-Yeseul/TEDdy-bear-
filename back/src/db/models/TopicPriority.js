import mongoose from "mongoose";
import { TopicPriorityModel } from "../schemas/topicPriority";

class TopicPriority {
  static create({ user_id }) {
    return TopicPriorityModel.create({ user_id });
  }

  static findOne({ user_id }) {
    if (!mongoose.isValidObjectId(user_id)) {
      user_id = mongoose.Types.ObjectId(user_id);
    }

    return TopicPriorityModel.findOne({ user_id });
  }
}

export { TopicPriority };
