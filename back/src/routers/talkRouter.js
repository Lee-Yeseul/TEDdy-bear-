import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { TalkController } from "../contoller/talkController";

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
talkRouter.get("/talks/today", TalkController.readToday);

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
talkRouter.get("/talks/my", loginRequired, TalkController.readMy);

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
talkRouter.get("/talks/:talk_id", TalkController.readOneById);

/**
 * @swagger
 *  /talks/like/ranking :
 *  get:
 *    summary: "teddy_like_count 순 영상 조회(size개까지) "
 *    description: "영상 좋아요 순 조회"
 *    tags: [Talk]
 *    parameters:
 *      - in: query
 *        name: size
 *        required: true
 *        description: 인기 순(size 개수 return)
 *        schema:
 *          type: integer
 *    responses:
 *      "200":
 *        description: 시청기록 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Talk'
 */

talkRouter.get("/talks/like/ranking", TalkController.readLikesRanking);

export { talkRouter };
