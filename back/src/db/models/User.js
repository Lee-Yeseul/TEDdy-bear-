import { LikeModel } from '../schemas/like';
import { UserModel } from '../schemas/user';
import { ViewHistoryModel } from '../schemas/viewHistory';
import { BookmarkModel } from '../schemas/bookmark';
import { CommentModel } from '../schemas/comment';
import { ReplyModel } from '../schemas/reply';

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ userId, user_id }) {
    const user = await UserModel.findOne({ id: userId ?? user_id });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  //user 컬렉션에서 user_id와 매칭되는 user 정보를 삭제하는 함수
  static async deleteOneUser({ user_id }) {
    const user = await UserModel.deleteOne({ id: user_id });
    return user;
  }

  // 패스워드 변경기능
  static async updatePassword({ user_id, toUpdate }) {
    const filter = { id: user_id };
    const update = { $set: toUpdate };
    const option = { returnOriginal: false };

    return await UserModel.findOneAndUpdate(filter, update, option);
  }

  // 프로파일 이미지 업데이트를 위해서 사용
  static async updateImg({ user_id, toUpdate }) {
    const filter = { id: user_id };
    const update = { $set: toUpdate };
    // 기존 이미지 삭제를 위해서 Original을 리턴
    const option = { returnOriginal: true };

    return await UserModel.findOneAndUpdate(filter, update, option);
  }

  // id로 쿼리, 특정 [컬럼] 리스트 값 업데이트
  static async updateById({ user_id, toUpdate }) {
    const filter = { id: user_id };
    const update = { $set: toUpdate };
    const option = { returnOriginal: false };

    return await UserModel.findOneAndUpdate(filter, update, option);
  }

  // 특정 컬럼의 숫자를 증가 시키기 위함 (ex cotton)
  static async updateCountById({ user_id, toUpdate }) {
    const filter = { id: user_id };
    const update = { $inc: toUpdate };
    const option = { returnOriginal: false };

    return await UserModel.findOneAndUpdate(filter, update, option);
  }

  // 곰 데이터 찾기
  static async findBearInfoByUserId({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });

    const bearName = user.bearName;
    const level = user.level;
    const cotton = user.cotton;
    const height = user.height;
    const exp = user.exp;

    const bearInfo = { bearName, level, cotton, height, exp };

    return bearInfo;
  }
  static async deleteAllById({ user }) {
    Promise.allSettled([
      ViewHistoryModel.deleteMany({ user_id: user.user_id }),
      LikeModel.deleteMany({ user_id: user._id }),
      BookmarkModel.deleteMany({ userId: user.user_id }),
      CommentModel.deleteMany({ user: user._id }),
      ReplyModel.deleteMany({ user: user._id }),
    ]).catch(err => {
      console.log(err)
    })
  }
}

export { User };
