import { Data } from '../db';

class dataService {
    static async findById(id) {
      return await Data.findById(id);
    }

    static async findAll() {
        const objdata = {}
        const listdata = await Data.findAll()
        listdata.forEach(row => {
          objdata[row['id']] = row['data']
        })
        return objdata
    }
}
  
export { dataService };
  