import { IAppContext } from "../types/app";
import { BookingService } from "./bookings";
import { BusService } from "./bus";
import { TicketService } from "./ticket";
import { TripService } from "./trip";
import UserService from "./user";

export interface IServices {
  user: UserService;
  bus: BusService;
  booking: BookingService;
  trip: TripService;
  ticket: TicketService;
}

export default async function initServices(context: IAppContext) {
  try {
    return {
      user: new UserService(context),
      bus: new BusService(context),
      booking: new BookingService(context),
      trip: new TripService(context),
      ticket: new TicketService(context),
    };
  } catch (e) {
    throw e;
  }
}
