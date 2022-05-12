import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { BookmarkController } from '../contoller/bookmarkController';
const bookmarkRouter = Router();

/**
 * @swagger
 * paths:
 *  /bookmarks:
 *   get:
 *     summary: "JWT user_id로 북마크 조회"
 *     tags: [Bookmark]
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 payload:
 *                   type: object
 *                   properties:
 *                     talkId:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                         speakers:
 *                           type: array
 *                         topic강연 정보들:
 *                           type: string
 *                         bookmark_id:
 *                           type: string
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
bookmarkRouter.get("/bookmarks", loginRequired, BookmarkController.readMy);

/**
 * @swagger
 * paths:
 *  /bookmarks/bookmark:
 *   post:
 *     summary: 강연 북마크 추가
 *     tags: [Bookmark]
 *     requestBody:
 *       description: JWT user_id, 강연 Id으로 북마크 추가
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               talkId:
 *                 type: number
 *     responses:
 *       "201":
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  payload:
 *                    type: object
 *                    properties:
 *                      bookmark_id:
 *                        type: string
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
bookmarkRouter.post("/bookmarks/bookmark", loginRequired, BookmarkController.create);

/**
 * @swagger
 * paths:
 *  /bookmarks/{bookmark_id}:
 *   delete:
 *     summary: 강연 북마크 삭제
 *     tags: [Bookmark]
 *     parameters:
 *       - in: path
 *         name: bookmark_id   
 *         required: true
 *         schema:
 *           type: string
 *         description: bookmark_id
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
bookmarkRouter.delete("/bookmarks/:talk_id", loginRequired, BookmarkController.deleteMy);

export { bookmarkRouter };
