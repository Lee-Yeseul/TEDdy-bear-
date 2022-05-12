import { CommentService } from "../services/commentService";

class CommentController {
  static async readOneByTalkId(req, res, next) {
    try {
      const talkId = Number(req.params.talkId);

      const comments = await CommentService.getComments(talkId);
      if (comments.errorMessage) {
        throw new Error(comments.errorMessage);
      }

      res.status(200).send(comments);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const mode = req.body.mode;
      const userId = req.currentUserId;
      const talkId = Number(req.body.talkId);
      const parentCommentId =
        mode === "reply" ? req.body.parentCommentId : null;
      const comment = req.body.comment;

      let result;
      if (mode === "comment") {
        result = await CommentService.addComment(talkId, comment, userId);
      } else if (mode === "reply") {
        result = await CommentService.addReply(
          parentCommentId,
          comment,
          userId
        );
      }

      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }

      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMyById(req, res, next) {
    try {
      const mode = req.query.mode;
      const userId = req.currentUserId;
      const comment_id = req.params.comment_id;

      let result;
      if (mode === "comment") {
        result = await CommentService.deleteComment(comment_id, userId);
      } else if (mode === "reply") {
        result = await CommentService.deleteReply(comment_id, userId);
      }

      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

export { CommentController };
