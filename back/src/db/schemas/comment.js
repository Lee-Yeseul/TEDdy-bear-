import { Schema, model } from "mongoose";

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: 댓글 스키마
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      properties:
 *        talk:
 *          type: string
 *        user:
 *          type: object
 *          properties:
 *            name: 
 *              type: string
 *            email: 
 *              type: string
 *        comment:
 *          type: string
 *        reply:
 *          type: array
 *          items:
 *            $ref: "#/components/schemas/Reply"
 */

const CommentSchema = new Schema(
  {
    talk: {
      type: Schema.Types.ObjectId,
      ref: "Talk",
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
    reply: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  { timestamps: true }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
