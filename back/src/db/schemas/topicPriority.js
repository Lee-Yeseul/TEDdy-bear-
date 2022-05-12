import { Schema, model } from "mongoose";
import { TOPICS } from "./constants";

const TOPIC_MAP = TOPICS.reduce((map, topic) => { 
  map[topic] = 0
  return map
}, {})

const TopicPrioritySchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  priority: {
    type: Map,
    of: Number,
    default: TOPIC_MAP,
  },
});

const TopicPriorityModel = model("TopicPriority", TopicPrioritySchema);

export { TopicPriorityModel };

