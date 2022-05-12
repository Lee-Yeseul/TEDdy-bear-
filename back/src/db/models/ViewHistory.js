/**
 * 시청 기록 모델, 서비스에서 필요한 데이터 처리 관련 코드 작성
 *
 * 시청 기록 생성, 조회, 수정
 */

import { ViewHistoryModel } from '../schemas/viewHistory';

class ViewHistory {
  // create() : 새로운 시청기록에 대한 정보를 db에 만들고 return
  static async create({ newViewHistory }) {
    return ViewHistoryModel.create(newViewHistory);
  }

  // findOneById() : db에서 viewHistoryId와 같은 document 하나의 객체를 return
  static async findOneById({ viewHistoryId }) {
    return ViewHistoryModel.findOne({ id: viewHistoryId });
  }

  // findManyByUserId() : 모든 시청기록 가져오기
  static async findManyByUserId({ user_id }) {
    return ViewHistoryModel.find({ user_id })
      .populate({ path: 'talkId' })
      .lean();
  }

  // createAt으로 4달 전까지의 데이터 찾아서 보내기
  static async findManyByCreatedAt({ user_id, size }) {
    const userViewHistorylist = ViewHistoryModel.find({ user_id })
      .populate({ path: 'talkId' })
      .lean();
    const dateBefore = new Date();
    const now = new Date();
    dateBefore.setMonth(now.getMonth() - size);

    return userViewHistorylist.find({
      createdAt: {
        $gte: dateBefore,
        $lte: now,
      },
    });
  }

  static async latest5({ user_id, size }) {
    const latest5 = ViewHistoryModel.aggregate([
      {
        $match: { user_id: user_id },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: size,
      },
      {
        $group: {
          _id: '$talkId',
        },
      },
    ]);

    return latest5;
  }

  // 랭킹보드 쿼리로 조회
  // 성능 문제가 생기면 user_id : count 형식으로 데이터를 따로 저장하고 count에 index를 설정해서 자동 정렬되게끔 설정
  static async rankingBoard({}) {
    const aggregatorOpts = [
      {
        $group: {
          _id: '$user_id',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ];

    return await ViewHistoryModel.aggregate(aggregatorOpts).limit(5).exec();
  }
}

export { ViewHistory };
