import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { LikeController } from "../contoller/likeController";

const likeRouter = Router();
likeRouter.use(loginRequired);
/**
 * @swagger
 * tags:
 *   name: Like
 *   description: 좋아요
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Like:
 *      type: object
 *      properties:
 *        user_id:
 *          type: ObjectId
 *        talk_id:
 *          type: ObjectId
 */

/**
 * @swagger
 *
 * /talks/talk/like:
 *  post:
 *    summary: "좋아요 생성"
 *    description: "한 번 누르면 좋아요 생성 다시 누르면 좋아요 삭제"
 *    tags: [Like]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              talkId:
 *                  type: number
 *    responses:
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
 *                      like_id:
 *                        type: string
 */
likeRouter.post("/talks/talk/like", loginRequired, LikeController.create);

/**
 * @swagger
 * paths:
 *  /likes/my:
 *    get:
 *      summary: "좋아요한 동영상 목록 조회"
 *      description: "유저아이디로 좋아요한 talks 목록 조회"
 *      tags: [Like]
 *      responses:
 *        "200":
 *          description: 영상 목록 조회
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  payload:
 *                    type: object
 *                    properties:
 *                      talkId :
 *                        $ref: '#components/schemas/Talk'
 */
// 유저가 좋아요한 동영상 리스트 가져오기

likeRouter.get("/likes/my", LikeController.readMy);

/**
 * @swagger
 * /userlist/:talkId:
 *  get:
 *    summary: "talk에 좋아요 누른 유저 조회"
 *    description: "talkId로 해당 영상에 좋아요를 누른 유저 목록 조회"
 *    tags: [Like]
 *    parameters:
 *      - in: path
 *        name: talkId
 *        required: true
 *        description: talk Id
 *        schema:
 *          type: string
 *    responses:
 *        "200":
 *          description: 영상 목록 조회
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  payload:
 *                    type: object
 *                    properties:
 *                      user_id :
 *                        $ref: '#components/schemas/User'
 */

// 해당 동영상에 좋아요를 누른 유저 리스트 가져오기
likeRouter.get("/userlist/:talkId", LikeController.readUsersByTalkId);

/**
 * @swagger
 * /talks/talk/like/:talkId:
 *   delete:
 *    summary: "좋아요 삭제"
 *    description: "한 번 누르면 좋아요 생성 다시 누르면 좋아요 삭제"
 *    tags: [Like]
 *    parameters:
 *      - in: path
 *        name: talkId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 좋아요 취소 성공
 *        content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 */

// 좋아요 삭제
likeRouter.delete("/talks/talk/like/:talkId", LikeController.deleteMy);

export { likeRouter };
