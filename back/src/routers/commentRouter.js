import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { CommentController} from "../contoller/commentController"
const commentRouter = Router();

/**
 * @swagger
 * paths:
 *  /talks/{talkId}/comments:
 *   get:
 *     summary: "강연 댓글 리스트 조회"
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: talkId
 *         required: true
 *         schema:
 *           type: string
 *         description: talkId (_id가 아님)
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
 *                   $ref: '#/components/schemas/Comment'
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
commentRouter.get("/talks/:talkId/comments", CommentController.readOneByTalkId);

/**
 * @swagger
 * paths:
 *  /comments/comment:
 *   post:
 *     summary: 강연 댓글 추가
 *     tags: [Comment, Reply]
 *     requestBody:
 *       description: mode(comment댓글, reply대댓글 중에 어떤 종류에 댓글인지), comment(댓글 내용), (댓글인 경우 필요한 데이터 -> ) talkId(댓글이 달릴 강연영상Id), (대댓글인 경우 필요한 데이터 -> ) parentCommentId(대댓글이라면 부모댓글이 될 댓글Id)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mode:
 *                 type: string
 *               talkId:
 *                 type: number
 *               parentCommentId:
 *                 type: string
 *               comment:
 *                 type: string
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
 *                    $ref: '#/components/schemas/Comment'
 *                  또는 payload:
 *                    $ref: '#/components/schemas/Reply'
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
commentRouter.post("/comments/comment", loginRequired, CommentController.create);

/**
 * @swagger
 * paths:
 *  /comments/comment:
 *   delete:
 *     summary: 강연 댓글 삭제 (?mode=comment 또는 ?mode=reply 붙여야 함)
 *     tags: [Comment, Reply]
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: string
 *         description: comment_id
 *       - in: query
 *         name: mode
 *         required: true
 *         schema:
 *           type: string
 *         description: comment댓글, reply대댓글 중에 어떤 종류에 댓글인지
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message :
 *                    type: string
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
commentRouter.delete("/comments/:comment_id", loginRequired, CommentController.deleteMyById);

export { commentRouter };
