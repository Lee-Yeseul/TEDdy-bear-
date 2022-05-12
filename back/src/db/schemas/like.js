import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const LikeSchema = new Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  talk_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Talk',
    required: true,
  },
});

const LikeModel = model('Like', LikeSchema);

export { LikeModel };
