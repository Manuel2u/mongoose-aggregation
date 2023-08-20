import { Document, Model, Types } from "mongoose";

export interface IBookings {
  Bus: Types.ObjectId;
  Trip: Types.ObjectId;
  numOfSeats: number;
  user: Types.ObjectId;
}

export interface IcreateBookingsInput extends IBookings {}

export interface IcreateBookingRequestBody extends Omit<IBookings, "user"> {}

export interface IBookingsSchema extends IBookings, Document {
  _id: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

export interface IBookingsModel extends Model<IBookingsSchema> {}
