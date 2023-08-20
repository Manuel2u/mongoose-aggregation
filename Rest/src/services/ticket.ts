import { IAppContext, IService } from "../types/app";
import {
  ITicketModel,
  ITicketSchema,
  IcreateTicketInput,
} from "../types/tickets";

export class TicketService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(input: IcreateTicketInput): Promise<ITicketSchema> {
    try {
      const ticket = new this.db.TicketModel({ ...input });
      await ticket.save();
      return ticket;
    } catch (e) {
      throw e;
    }
  }
}
