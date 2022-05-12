import { Schema, model } from 'mongoose';

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: 데이터 분석을 위한 Data default 스키마
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Data:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        keys:
 *          type: array
 *          items:
 *            type: string
 *        data:
 *          type: object
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ListData:
 *      type: object
 *      properties:
 *        id:
 *          type: object
 */

const DataSchema = new Schema(
    {
      id: {
        type: String,
        required: true,
      },
      keys: [String],
      data: {
        type: Map
      }
    }
  );

const DataModel = model('Data', DataSchema);

export { DataModel };
