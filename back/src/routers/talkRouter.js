import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { TalkService } from "../services/TalkService";

const talkRouter = Router();

// 오늘의 영상
/**
 * @swagger
 * paths:
 *  /talks/today:
 *   get:
 *     summary: "추천 영상"
 *     tags: [Talk]
 *     parameters:
 *       - in: query
 *         name: size
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 영상 개수
 *     responses:
 *       "200":
 *         description: 추후 수정 예정...
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Talk'
 */
talkRouter.get("/talks/today", async (req, res, next) => {
  try {
    const size = Number(req.query.size) < 1 ? 1 : Number(req.query.size)
    
    const talks = await TalkService.getTodayTalk({ size })
    if (talks.errorMessage) {
      throw new Error(talks.errorMessage)
    }

    res.status(200).send(talks)
  } catch (e) {
    next(e);
  }
});

// 추천된 영상
/**
 * @swagger
 * paths:
 *  /talks/my:
 *   get:
 *     summary: "사용자 관심 주제별 추천 영상"
 *     tags: [Talk]
 *     parameters:
 *        - in: query
 *          name: size
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: 영상 개수
 *     responses:
 *       "200":
 *         description: 추후 수정 예정...
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Talk'
 */
talkRouter.get("/talks/my", login_required, async (req, res, next) => {
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
});

// 영상 상세정보 조회
/**
 * @swagger
 * paths:
 *  /talks/{talk_id}:
 *   get:
 *     summary: "영상 상세정보 조회"
 *     tags: [Talk]
 *     parameters:
 *       - in: path
 *         name: talk_id
 *         required: true
 *         description: 영상 아이디
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: 영상 상세정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Talk'
 */
talkRouter.get("/talks/:talk_id", async (req, res, next) => {
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
});

export { talkRouter };
