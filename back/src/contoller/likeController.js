import { likeService } from "../services/likeService";

class LikeController {
  static async create(req, res, next) {
    try {
      const userId = req.currentUserId;
      const talkId = Number(req.body.talkId);

      const newLike = await likeService.addlike({ userId, talkId });

      res.status(200).send(newLike);
    } catch (error) {
      next(error);
    }
  }

  static async readMy(req, res, next) {
    try {
      const userId = req.currentUserId;
      const userLike = await likeService.getUserLikeList({ userId });

      res.status(200).send(userLike);
    } catch (error) {
      next(error);
    }
  }

  static async readUsersByTalkId(req, res, next) {
    try {
      const talkId = Number(req.params.talkId);
      const talkLike = await likeService.getTalkLikeList({ talkId });

      res.status(200).send(talkLike);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMy(req, res, next) {
    try {
      const userId = req.currentUserId;
      const talkId = Number(req.params.talkId);

      const result = await likeService.deleteLike({ userId, talkId });

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

export { LikeController };
