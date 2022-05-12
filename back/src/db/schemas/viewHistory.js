import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const viewHistorySchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    talkId: {
      type: mongoose.Types.ObjectId,
      ref: 'Talk',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ViewHistoryModel = model('ViewHistory', viewHistorySchema);

export { ViewHistoryModel };
