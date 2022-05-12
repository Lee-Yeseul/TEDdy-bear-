import { Schema, model } from "mongoose";

const TopicSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
      unique: true,
    },
    related_talks: {
      type: Array,
      ref: 'Talk',
    },
  },
  { timestamps: true }
);

const TopicModel = model("Topic", TopicSchema);

export { TopicModel };
