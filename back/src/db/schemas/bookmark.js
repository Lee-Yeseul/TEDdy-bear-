import { Schema, model } from "mongoose";

/**
 * @swagger
 * tags:
 *   name: Bookmark
 *   description: 북마크 스키마
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Bookmark:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        talk_id:
 *          type: ObjectId
 */

const BookmarkSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    talk_id: {
      type: Schema.Types.ObjectId,
      ref: "Talk",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookmarkModel = model("Bookmark", BookmarkSchema);

export { BookmarkModel };
