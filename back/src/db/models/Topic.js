import { TopicModel } from "../schemas/topic";

class Topic {
  static findById({ topic_id }) {
    return TopicModel.findOne( topic_id )
  }

  static findManyRandom(size) {
    return TopicModel.aggregate([{ $sample: { size: size } }])
  }
}

export { Topic };