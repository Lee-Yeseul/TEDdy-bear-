import { DataModel } from '../schemas/data';

class Data {
  static async findById(dataId) {
    return await DataModel.findOne({ id : dataId });
  }

  static async findAll() {
    return await DataModel.find({ keys: { $exists:true } });
  }
}

export { Data };
