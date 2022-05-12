import { BookmarkModel } from "../schemas/bookmark";

class Bookmark {
  static findOne(userId, talk_id) {
    return BookmarkModel.findOne({ userId: userId, talk_id: talk_id});
  }

  static findManyByUserId(userId) {
    return BookmarkModel.find({ userId: userId }).populate({ path: 'talk_id'}).lean();
  }

  static addOne(userId, talk_id) {
    return BookmarkModel.create({ userId: userId, talk_id: talk_id });
  }

  static findOneAndDelete(userId, talk_id) {
    return BookmarkModel.findOneAndDelete({ userId: userId, talk_id: talk_id });
  }

  static deleteManyByUserId(userId) {
    // 회원 탈퇴 시에 모든 북마크 삭제
    return BookmarkModel.deleteMany({ userId: userId });
  }
}

export { Bookmark };
