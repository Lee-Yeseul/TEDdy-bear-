import { ViewHistoryService } from "../services/viewHistoryService";

class ViewHistoryController {
  static async create(req, res, next) {
    try {
      const user_id = req.body.user_id;
      const talkId = Number(req.body.talkId);

      const newViewHistory = await ViewHistoryService.addViewHistory({
        user_id,
        talkId,
      });
      if (newViewHistory.errorMessage) {
        throw new Error(newViewHistory.errorMessage);
      }

      res.status(200).json(newViewHistory);
    } catch (error) {
      next(error);
    }
  }

  static async readOneById(req, res, next) {
    try {
      const viewHistoryId = req.params.id;
      const viewHistory = await ViewHistoryService.getViewHistory({
        viewHistoryId,
      });

      res.status(200).send(viewHistory);
    } catch (error) {
      next(error);
    }
  }

  static async readOneByUserId(req, res, next) {
    try {
      const user_id = req.params.user_id;

      //해당 user_id에 맞는 목록을 db에서 가져와 조회
      const viewHistorylist = await ViewHistoryService.getViewHistorylist({
        user_id,
      });
      res.status(200).send(viewHistorylist);
    } catch (error) {
      next(error);
    }
  }

  static async readManyByDate(req, res, next) {
    try {
      const user_id = req.params.user_id;
      const date = req.params.date;

      const viewHistoryDatelist = await ViewHistoryService.getViewHistoryDate({
        user_id,
        date,
      });

      res.status(200).send(viewHistoryDatelist);
    } catch (error) {
      next(error);
    }
  }

  static async readManyByUserId(req, res, next) {
    try {
      const user_id = req.params.user_id;
      const size = Number(req.query.size);

      const today = await ViewHistoryService.getViewHistoryUntilToday({
        user_id,
        size,
      });

      res.status(200).send(today);
    } catch (error) {
      next(error);
    }
  }

  static async readMyRecent(req, res, next) {
    try {
      const user_id = req.currentUserId;
      const size = Number(req.query.size);
      const latest = await ViewHistoryService.getLatest5({ user_id, size });
      res.status(200).send(latest);
    } catch (error) {
      next(error);
    }
  }

  static async readTop5(req, res, next) {
    try {
      const rankingBoard = await ViewHistoryService.rankingBoard({});

      res.status(200).send(rankingBoard);
    } catch (error) {
      next(error);
    }
  }
}

export { ViewHistoryController };
