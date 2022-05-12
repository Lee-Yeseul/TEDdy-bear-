import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      immutable: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function () {
        return this.infoProvider === 'User';
      },
    },
    myTopics: {
      type: Array,
      required: true,
    },
    profileUrl: {
      type: String,
      required: false,
      default: process.env.DEFAULT_IMAGE_URL,
    },
    bearName: {
      type: String,
      required: true,
      default: 'Teddy',
    },
    level: {
      type: Number,
      required: true,
      default: 1,
    },
    exp: {
      type: Number,
      required: true,
      default: 0,
    },
    cotton: {
      type: Number,
      required: true,
      default: 0,
    },
    height: {
      type: Number,
      required: true,
      default: 10,
    },
    age: {
      type: String,
      required: false,
    },
    sex: {
      type: String,
      required: false,
    },
    occupation: {
      type: String,
      required: false,
    },
    myTopics: {
      type: Array,
      default: [],
    },
    alert: {
      type: Boolean,
      default: true,
    },
    infoProvider: {
      type: String,
      enum: {
        values: ['User', 'Google'],
        message: '{VALUE} 로 로그인하기는 아직 지원되지 않습니다.',
      },
    },
    description: {
      type: String,
      required: true,
      default: '설명이 아직 없습니다. 추가해 주세요.',
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model('User', UserSchema);

export { UserModel };
