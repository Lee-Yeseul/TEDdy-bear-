import { TalkService } from "../services/TalkService";

class TalkController {
  static async readToday(req, res, next) {
    try {
      const size = Number(req.query.size) < 1 ? 1 : Number(req.query.size);

      const talks = await TalkService.getTodayTalk({ size });
      if (talks.errorMessage) {
        throw new Error(talks.errorMessage);
      }

      res.status(200).send(talks);
    } catch (e) {
      next(e);
    }
  }

  static async readMy(req, res, next) {
    try {
      const size = Number(req.query.size) < 1 ? 1 : Number(req.query.size);
      const userId = req.currentUserId;
      const talks = await TalkService.getMyTalk({ size, userId });

      if (talks.errorMessage) {
        throw new Error(talks.errorMessage);
      }

      res.status(200).send(talks);
    } catch (e) {
      next(e);
    }
  }

  static async readOneById(req, res, next) {
    try {
      const id = Number(req.params.talk_id);

      const talk = await TalkService.getTalk({ id });
      if (talk.errorMessage) {
        throw new Error(talk.errorMessage);
      }

      res.status(200).send(talk);
    } catch (e) {
      next(e);
    }
  }

  static async readLikesRanking(req, res, next) {
    try {
      const size = Number(req.query.size);
      const likeRanking = await TalkService.likeRanking({ size });

      res.status(200).send(likeRanking);
    } catch (error) {
      next(error);
    }
  }
}

export { TalkController };
