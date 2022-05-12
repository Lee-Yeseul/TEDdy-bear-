import { MailTTLModel } from '../schemas/mailTTL';

class MailTTL {
  static async create({ newItem }) {
    return await MailTTLModel.create(newItem);
  }

  static async findByCode({ code }) {
    return MailTTLModel.findOne({ code });
  }
}

export { MailTTL };
