import { Schema, model } from "mongoose";
/**
 * @swagger
 * tags:
 *   name: Talk
 *   description: 영상 상세정보 조회, 오늘의 영상, 사용자 관심사 추천 영상
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Talk:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        title:
 *          type: string
 *        speakers:
 *          type: array
 *          items:
 *            type: string
 *        author:
 *          type: string
 *        description:
 *          type: string
 *        topics:
 *          type: array
 *          items:
 *            type: string
 *        teddy_view_count:
 *          type: number
 *        teddy_like_count:
 *          type: number
 *        url:
 *          type: string
 *        native_languages:
  *          type: array
 *          items:
 *            type: string
 *        available_languages:
  *          type: array
 *          items:
 *            type: string
 *        published_date:
 *          type: string
 *        duration:
 *          type: string
 */

const TalkSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    speakers: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    topics: {
      type: Array,
      required: true,
    },
    teddy_view_count: {
      type: Number,
      min: [0, '0보다 작을 수는 없으므로 {VALUE} 값은 저장할 수 없습니다.'],
    },
    teddy_like_count: {
      type: Number,
      min: [0, '0보다 작을 수는 없으므로 {VALUE} 값은 저장할 수 없습니다.'],
    },
    url: {
      type: String,
      required: true,
    },
    native_languages: {
      type: Array,
      required: true,
    },
    available_languages: {
      type: Array,
      required: true,
    },
    published_date: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: false,
    },
    // related_talks: {
    //   type: Array,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const TalkModel = model("Talk", TalkSchema);

export { TalkModel };
