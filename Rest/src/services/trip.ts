import { IAppContext, IService } from "../types/app";
import { ITripSchema, IcreateTripInput } from "../types/trips";

export class TripService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(input: IcreateTripInput): Promise<ITripSchema> {
    try {
      const trip = new this.db.TripModel({ ...input });
      await trip.save();
      return trip;
    } catch (e) {
      throw e;
    }
  }
}
