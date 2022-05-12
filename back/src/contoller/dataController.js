import { dataService } from "../services/dataService";

class DataController {
  static async readOneById(req, res, next) {
    try {
      const data = await dataService.findById(req.params.id);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  static async readAll(req, res, next) {
    try {
      const data = await dataService.findAll();
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
}

export { DataController };
