import { SomTTLModel } from '../schemas/somTTL';

class SomTTL {
  static async create({ newItem }) {
    return await SomTTLModel.create(newItem);
  }

  static async findById({ id }) {
    return SomTTLModel.findOne({ id });
  }
}

export { SomTTL };
