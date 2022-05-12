import { LikeModel } from '../schemas/like';

class Like {
  // like 생성 조회 삭제
  // 다 필요한 듯!
  static async create({ newLike }) {
    const createdNewLike = await LikeModel.create(newLike);
    return createdNewLike;
  }
  // 둘 다로 찾기
  static async findOne({ user_id, talk_id }) {
    return await LikeModel.findOne({ user_id, talk_id });
  }

  // 유저 아이디로 영상 리스트 찾기
  static async findManyByUserId({ user_id }) {
    return await LikeModel.find({ user_id })
      .populate({ path: 'talk_id' })
      .lean();
  }

  // 영상 아이디로 유저 리스트 찾기
  static async findManyByTalkId({ talk_id }) {
    return await LikeModel.find({ talk_id })
      .populate({ path: 'user_id' })
      .lean();
  }

  // 영상, 유저 아이디로 좋아요 삭제
  static async findLikeAndDelete({ user_id, talk_id }) {
    return await LikeModel.findOneAndDelete({ user_id, talk_id });
  }

  //
  static async findOneDelete({ isLiked }) {
    return await LikeModel.findOneAndDelete({
      user_id: isLiked.user_id,
      talk_id: isLiked.user_id,
    });
  }
}

export { Like };
