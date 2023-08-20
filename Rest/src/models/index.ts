import mongoose, { connect } from "mongoose";
import UserModel from "./user.model";
import { Config } from "../config";
import { IUserModel } from "../types/user";
import BusModel from "./bus.model";
import TripModel from "./trip.model";
import TicketModel from "./ticket.model";
import BookingModel from "./booking.model";
import { IBookingsModel } from "../types/bookings";
import { ITicketModel } from "../types/tickets";
import { ITripModel } from "../types/trips";
import { IBusModel } from "../types/bus";

export interface IDb {
  UserModel: IUserModel;
  BusModel: IBusModel;
  TripModel: ITripModel;
  TicketModel: ITicketModel;
  BookingModel: IBookingsModel;
}

export default async function InitDB(config: Config["db"]): Promise<IDb> {
  try {
    await connect(config.uri);
    console.log("Database connected");

    await UserModel.createCollection();
    await BusModel.createCollection();
    await TripModel.createCollection();
    await TicketModel.createCollection();
    await BookingModel.createCollection();

    return {
      UserModel,
      BusModel,
      TripModel,
      BookingModel,
      TicketModel,
    };
  } catch (e) {
    throw e;
  }
}
