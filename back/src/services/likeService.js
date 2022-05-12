import { Like, User, Talk } from '../db';
import { TalkService } from './TalkService';
import { TopicPriorityService } from './TopicPriorityService';

// addlike,
class likeService {
  static async addlike({ userId, talkId }) {
    const user = await User.findById({ userId });
    const talk = await Talk.findOneById({ id: talkId, resultType: 'POJO' });
    if (!talk) {
      const errorMessage = '존재하지 않는 동영상입니다.';
      return { errorMessage };
    }
    const user_id = user._id;
    const talk_id = talk._id;

    const isLiked = await Like.findOne({ user_id, talk_id });
    if (isLiked) {
      const errorMessage = '이미 좋아요를 누른 동영상입니다.';
      return { errorMessage };
    }

    const newLike = await Like.create({
      newLike: { user_id, talk_id },
    });

    // 영상의 좋아요 수 업데이트
    if (
      (await TalkService.updateLike({ talkId: talkId, status: 'like' })) ===
      false
    ) {
      console.log('좋아요 수 업데이트 실패');
    }

    // 우선도 업데이트
    await TopicPriorityService.plusPriorities({
      user_id: user._id,
      topics: talk.topics,
      point: 5,
    });

    return newLike;
  }

  // 유저 아이디로 영상 리스트 찾기
  static async getUserLikeList({ userId }) {
    const user = await User.findById({ userId });
    const user_id = user._id;
    const talklist = await Like.findManyByUserId({ user_id });

    if (talklist.length == 0) {
      const errorMessage = '좋아요를 누른 영상이 없습니다.';
      return { errorMessage };
    }

    const result = {
      message: '좋아요 조회 성공',
      payload: talklist.reduce((pre, item) => {
        pre[item.talk_id.id] = { ...item.talk_id, like_id: item._id };
        return pre;
      }, {}),
    };
    return result;
  }

  // 영상 아이디로 유저 리스트 찾기
  static async getTalkLikeList({ talkId }) {
    const talk = await Talk.findOneById({ id: talkId, resultType: 'POJO' });
    const talk_id = talk._id;
    const userlist = await Like.findManyByTalkId({ talk_id });
    if (userlist.length == 0) {
      const errorMessage = '해당 영상에 좋아요를 누른 유저가 없습니다.';
      return { errorMessage };
    }
    const result = {
      message: '유저 조회 성공',
      payload: userlist.reduce((pre, item) => {
        pre[item.user_id.id] = { ...item.user_id, like_id: item._id };
        return pre;
      }, {}),
    };

    return result;
  }

  // 영상 아이디, 유저 아이디로 리스트 삭제하기
  static async deleteLike({ userId, talkId }) {
    const user = await User.findById({ userId });
    const talk = await Talk.findOneById({ id: talkId, resultType: 'POJO' });
    if (!talk) {
      const errorMessage = '존재하지 않는 동영상입니다.';
      return { errorMessage };
    }
    const user_id = user._id;
    const talk_id = talk._id;

    const isLiked = await Like.findLikeAndDelete({ user_id, talk_id });

    if (!isLiked) {
      const errorMessage = '이미 취소했습니다';
      return { errorMessage };
    }

    // 영상의 좋아요 수 업데이트
    if (
      (await TalkService.updateLike({ talkId: talkId, status: 'cancel' })) ===
      false
    ) {
      console.log('좋아요 수 업데이트 실패');
    }

    // 우선도 업데이트
    await TopicPriorityService.minusPriorities({
      user_id: user._id,
      topics: talk.topics,
      point: 5,
    });

    return { status: 'ok' };
  }
}

export { likeService };
