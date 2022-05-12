import is from "@sindresorhus/is";
import { Router } from "express";
import { UserController } from "../contoller/userController";
import { loginRequired } from "../middlewares/loginRequired";
import { uploadHandler } from "../utils/multer";

const userAuthRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가 수정 삭제 조회
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        profileUrl:
 *          type: string
 *        description:
 *          type: string
 *        password:
 *          type: string
 *        bearName:
 *          type: string
 *        level:
 *          type: number
 *        cotton:
 *          type: number
 *        height:
 *          type: number
 *        exp:
 *          type: number
 *        sex:
 *          type: string
 *        age:
 *          type: number
 *        occupation:
 *          type: string
 *        myTopics:
 *          type: array
 *          items:
 *            type: string
 *        alert:
 *          type: boolean
 *        infoProvider:
 *          type: string
 *
 */

/**
 * @swagger
 * components:
 *    User_req:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        password:
 *          type: string
 *
 */

// 회원가입

/**
 * @swagger
 *
 * /user/register:
 *  post:
 *    summary: "유저 등록"
 *    description: "POST 방식으로 유저를 등록한다."
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/User'
 */

userAuthRouter.post("/user/register", UserController.create);

/**
 * @swagger
 *
 * /user/login:
 *  post:
 *    summary: "유저 로그인"
 *    description: "data.cottonUpdateState로 솜 3개 주기 true/false 반환"
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *    responses:
 *        "200":
 *          description: 유저정보 반환
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                items:
 *                  $ref: '#components/schemas/User'
 */

// 로그인
userAuthRouter.post("/user/login", UserController.login);

/**
 * @swagger
 *
 * /user/google-login:
 *  post:
 *    summary: "유저 구글로그인"
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                  type: string
 */
userAuthRouter.post("/user/google-login", UserController.googleLogin);

/**
 * @swagger
 *
 * /user/mail:
 *  post:
 *    summary: "메일 전송하기"
 *    tags: [Users]
 *    requestBody:
 *      description: email이 비어있으면 임시비밀번호 발급, email이 있으면 인증 code 발급 (10분 ttl)
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                  type: string
 *              id:
 *                  type: string
 */

userAuthRouter.post("/user/mail", UserController.sendMail);

/**
 * @swagger
 *
 * /user/check/code:
 *  post:
 *    summary: "email로 받은 인증 code check 로직"
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              code:
 *                  type: string
 */

userAuthRouter.post("/user/check/code", UserController.checkCode);

/**
 * @swagger
 *
 * /user/update/password:
 *  post:
 *    summary: "나의 비밀번호 변경"
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                  type: string
 *              password:
 *                  type: string
 */
userAuthRouter.post(
  "/user/update/password",
  loginRequired,
  UserController.updatePassword
);

/**
 * @swagger
 *
 * /user/cotton/:exp:
 *  post:
 *    summary: "cotton 사용해서 exp 올리기"
 *    tags: [Users]
 *    description: login required
 */
userAuthRouter.post(
  "/user/cotton/:exp",
  loginRequired,
  UserController.updateMyExp
);

/**
 * @swagger
 *
 * /user/img:
 *  post:
 *    summary: "프로파일 이미지 업로드"
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              img:
 *                  type: image
 */
userAuthRouter.post(
  "/user/img",
  loginRequired,
  uploadHandler.single("img"),
  UserController.updateMyImg
);

/**
 * @swagger
 * paths:
 *  /userlist:
 *    get:
 *      summary: "유저 데이터 전체조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: 전체 유저 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/User'
 */

//userlist 반환
userAuthRouter.get("/userlist", loginRequired, UserController.readUsers);

//사용자 정보 반환
userAuthRouter.get("/user/current", loginRequired, UserController.readMy);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *    summary: "유저 수정"
 *    description: "PUT 방식을 통해 유저 수정(전체 데이터를 수정할 때 사용함)"
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 유저 수정
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/User'
 *    responses:
 *      "200":
 *        description: user 수정 성공
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#components/schemas/User'
 */

//user 정보 수정
userAuthRouter.put("/users/:id", loginRequired, UserController.updateMy);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: "특정 유저조회 Path 방식"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 유저 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 */

//user 정보 반환
userAuthRouter.get("/users/:id", loginRequired, UserController.readOneById);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *    summary: "유저 삭제"
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 유저 삭제
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#components/schemas/User'
 *    responses:
 *      "200":
 *        description: user 삭제 성공
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#components/schemas/User'
 */

//user 삭제 컴포넌트
userAuthRouter.delete("/users/user", loginRequired, UserController.deleteMy);

/**
 * @swagger
 * /bear/{id}:
 *  get:
 *    summary: "특정 유저 bear 정보 조회 Path 방식"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 유저 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                bearName:
 *                  type: string
 *                level:
 *                  type: Number
 *                cotton:
 *                  type: Number
 *                height:
 *                  type: Number
 *                exp:
 *                  type: Number
 */

// 곰 정보 찾기
userAuthRouter.get("/bear/:id", loginRequired, UserController.readMyBear);

export { userAuthRouter };
