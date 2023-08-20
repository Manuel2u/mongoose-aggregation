import { Schema, SchemaTypes, model } from "mongoose";
import { IBookingsModel, IBookingsSchema } from "../types/bookings";

const BookingSchema = new Schema<IBookingsSchema>({
  Bus: {
    type: SchemaTypes.ObjectId,
    ref: "Bus",
    required: true,
  },
  Trip: {
    type: SchemaTypes.ObjectId,
    ref: "Trip",
    required: true,
  },
  numOfSeats: {
    type: SchemaTypes.Number,
    required: true,
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
});

const BookingModel = model<IBookingsSchema, IBookingsModel>(
  "Booking",
  BookingSchema
);

export default BookingModel;
