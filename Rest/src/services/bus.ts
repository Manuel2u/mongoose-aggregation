import { IAppContext, IService } from "../types/app";
import {
  IAddBusInput,
  IBusSchema,
  IDeleteBus,
  IQueryBus,
  IUpdateBus,
} from "../types/bus";

export class BusService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(input: IAddBusInput): Promise<IBusSchema> {
    try {
      const bus = new this.db.BusModel({ ...input });

      await bus.save();
      return bus;
    } catch (e) {
      throw e;
    }
  }

  //   async getAll(input : IQueryBus) : Promise<Ibus>{
  //     try {

  //     } catch (error) {

  //     }
  //   }

  //   async getOne(input : IQueryBus) : Promise<Ibus>{
  //     try {

  //     } catch (error) {

  //     }
  //   }

  //   async updateOne(input : IUpdateBus) : Promise<Ibus>{
  //     try {

  //     } catch (error) {

  //     }
  //   }

  //   async deleteOne(input : IDeleteBus) : Promise<Ibus>{
  //     try {

  //     } catch (error) {

  //     }
  //   }
}
