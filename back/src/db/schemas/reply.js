import { Schema, model } from "mongoose";

/**
 * @swagger
 * tags:
 *   name: Reply
 *   description: 대댓글 스키마
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Reply:
 *      type: object
 *      properties:
 *        parentCommentId:
 *          type: string
 *        comment:
 *          type: string
 *        user:
 *          type: string
 */

const ReplySchema = new Schema(
  {
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReplyModel = model("Reply", ReplySchema);

export { ReplyModel };
