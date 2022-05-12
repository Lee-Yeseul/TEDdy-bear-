import { userAuthService } from "../services/userService";

class UserController {
  static async create(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // req (request) 에서 데이터 가져오기
      const {
        name,
        email,
        password,
        myTopics,
        bearName,
        sex,
        age,
        occupation,
      } = req.body;

      // 위 데이터를 유저 db에 추가하기
      const newUser = await userAuthService.addUser({
        name,
        email,
        password,
        myTopics,
        bearName,
        sex,
        age,
        occupation,
        infoProvider: "User",
      });

      if (newUser.errorMessage) {
        throw new Error(newUser.errorMessage);
      }

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      // req (request) 에서 데이터 가져오기
      const { email, password } = req.body;

      // 위 데이터를 이용하여 유저 db에서 유저 찾기
      const user = await userAuthService.getUser({ email, password });

      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { token } = req.body;

      const user = await userAuthService.socialLoginBy(token);
      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  static async sendMail(req, res, next) {
    try {
      const { email, type } = req.body;
      const user = await userAuthService.sendMail({ email, type });

      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  static async checkCode(req, res, next) {
    try {
      const { code } = req.body;
      const auth = await userAuthService.checkCode({ code });

      if (auth.errorMessage) {
        throw new Error(auth.errorMessage);
      }

      res.status(200).send(true);
    } catch (error) {
      next(error);
    }
  }

  static async updatePassword(req, res, next) {
    try {
      const { id, password } = req.body;
      const updatedUser = await userAuthService.updatePassword({
        user_id: id,
        password,
      });
      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).send(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  static async updateMyExp(req, res, next) {
    try {
      const user_id = req.currentUserId;
      const exp = Number(req.params.exp);

      const updatedUser = await userAuthService.updateExp({
        user_id,
        exp,
      });
      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).send(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  static async updateMyImg(req, res, next) {
    try {
      if (!req.file) {
        res.status(400).json({ message: "업로드할 이미지가 없습니다" });
        return;
      }

      const user_id = req.currentUserId;
      const url = req.file.path;
      const updatedUser = await userAuthService.updateImg({ user_id, url });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).send({ url: url });
    } catch (error) {
      next(error);
    }
  }

  static async readUsers(req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userAuthService.getUsers();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }

  static async readMy(req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        user_id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }

  static async updateMy(req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.currentUserId;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const password = req.body.password ?? null;
      const myTopics = req.body.myTopics ?? null;
      const bearName = req.body.bearName ?? null;
      const level = req.body.level ?? null;
      const cotton = req.body.cotton ?? null;
      const height = req.body.height ?? null;
      const sex = req.body.sex ?? null;
      const age = req.body.age ?? null;
      const occupation = req.body.occupation ?? null;
      const description = req.body.description ?? null;
      const exp = req.body.exp ?? null;
      const alert = req.body.alert || null;

      const toUpdate = {
        name,
        password,
        myTopics,
        bearName,
        level,
        cotton,
        height,
        sex,
        age,
        occupation,
        description,
        exp,
        alert,
      };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({
        user_id,
        toUpdate,
      });
      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  static async readOneById(req, res, next) {
    try {
      const user_id = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ user_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMy(req, res, next) {
    try {
      const user_id = req.currentUserId;

      // 전체 정보 삭제
      await userAuthService.deleteUserAllInfo({ user_id });
      //유저 삭제하는 메소드 호출
      await userAuthService.deleteUser({ user_id });

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }

  static async readMyBear(req, res, next) {
    try {
      const user_id = req.currentUserId;

      const bearInfo = await userAuthService.getBearInfo({ user_id });
      if (bearInfo.errorMessage) {
        throw new Error(bearInfo.errorMessage);
      }

      res.status(200).send(bearInfo);
    } catch (error) {
      next(error);
    }
  }
}

export { UserController };
