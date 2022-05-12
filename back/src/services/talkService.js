import { Talk, Topic, User } from "../db";
import { TopicPriorityService } from "./TopicPriorityService";

class TalkService {
  static async getTalk({ id }) {
    const talk = await Talk.findOneById({ id, resultType: "POJO" });
    if (!talk) {
      const errorMessage = "영상 조회에 실패하였습니다.";
      return { errorMessage };
    }

    return talk;
  }

  static async getTodayTalk({ size }) {
    // 주제를 랜덤으로 선정 -> 각 주제별로 영상 1개씩 선정
    const randomTopics = await Topic.findManyRandom(size);
    if (randomTopics.length === 0) {
      const errorMessage = "주제 조회에 실패하였습니다.";
      return { errorMessage };
    }

    let topics = [];
    for (let i = 0; i < randomTopics.length; i++) {
      topics.push(Object.keys(randomTopics[i])[1]);
    }

    const randomTalks = await Talk.findManyRandom(topics, size);
    if (randomTalks.length === 0) {
      const errorMessage = "영상 조회에 실패하였습니다.";
      return { errorMessage };
    }

    return randomTalks;
  }

  static async getMyTalk({ size, userId }) {
    // 사용자 관심 주제 조회
    // const { myTopics } = await User.findById({ userId });
    // if (!myTopics) { return { errorMessage: "주제 조회에 실패하였습니다." } }

    // 추천 알고리즘 적용
    const user = await User.findById({ userId });
    const myTopics = await TopicPriorityService.getMyFavoriteTopics({
      user_id: user._id,
    });

    const myTalk = await Talk.findManyRandom(myTopics, size);
    if (myTalk.length === 0) {
      return { errorMessage: "영상 조회에 실패하였습니다." };
    }

    return myTalk;
  }

  static async updateView(talkId) {
    // 기존 조회수
    const preTalk = await Talk.findOneById({
      id: talkId,
      resultType: "document",
    });
    const preViewCount = preTalk.teddy_view_count;

    // 조회 수 업데이트
    preTalk.teddy_view_count++;

    const postTalk = await Talk.updateView(preTalk._id, preTalk);

    // 업데이트 여부 확인
    if (preViewCount + 1 === postTalk.teddy_view_count) {
      return true;
    }
    return false;
  }

  static async updateLike({ talkId, status }) {
    // 기존 좋아요수
    const preTalk = await Talk.findOneById({
      id: talkId,
      resultType: "document",
    });
    const preLikeCount = preTalk.teddy_like_count;

    // 좋아요 수 업데이트
    if (status === "cancel") {
      preTalk.teddy_like_count--;
    } else if (status === "like") {
      preTalk.teddy_like_count++;
    }

    const postTalk = await Talk.updateView(preTalk._id, preTalk);

    // 업데이트 여부 확인
    if (
      preLikeCount + 1 === postTalk.teddy_like_count ||
      preLikeCount - 1 === postTalk.teddy_like_count
    ) {
      return true;
    }
    return false;
  }

  static async likeRanking({ size }) {
    return await Talk.likeRanking({ size });
  }
}

export { TalkService };
