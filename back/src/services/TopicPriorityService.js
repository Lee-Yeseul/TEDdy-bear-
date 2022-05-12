import { TopicPriority } from "../db";

class TopicPriorityService {
  static async plusPriorities({ user_id, topics, point }) {
    const myTopicPriority = await TopicPriority.findOne({ user_id });
    for (let i = 0; i < topics.length; i++) {
      myTopicPriority.priority.set(
        topics[i],
        myTopicPriority.priority.get(topics[i]) + point
      );
    }
    await myTopicPriority.save();
    return;
  }

  static async minusPriorities({ user_id, topics, point }) {
    const myTopicPriority = await TopicPriority.findOne({ user_id });
    for (let i = 0; i < topics.length; i++) {
      myTopicPriority.priority.set(
        topics[i],
        myTopicPriority.priority.get(topics[i]) - point
      );
    }
    await myTopicPriority.save();
    return;
  }

  static async getMyFavoriteTopics({ user_id }) {
    const { priority } = await TopicPriority.findOne({ user_id });

    const data = [...priority]; // 배열로 형변환

    let total = 0;
    for (let i = 0; i < data.length; ++i) {
      total += data[i][1];
    }

    const threshold = Math.random() * total;

    total = 0;
    let result = [];
    for (let i = 0; i < data.length - 1; ++i) {
      total += data[i][1];

      if (total >= threshold) {
        result.push(data[i][0]);
      }
    }

    return result;
  }
}

export { TopicPriorityService };
