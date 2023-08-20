import { NextFunction, Request, Response } from "express";
import { IAppContext } from "../types/app";
import {
  IcreateBookingRequestBody,
  IcreateBookingsInput,
} from "../types/bookings";

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext;
  }
}

export const CREATE_ONE = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Bus, Trip, numOfSeats }: IcreateBookingRequestBody = req.body;

    if (!Bus || !Trip || !numOfSeats) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const _booking = await req.context.services?.booking.createOne({
      Bus,
      Trip,
      numOfSeats,
      user: req.user._id,
    });

    return res.status(200).json(_booking);
  } catch (e) {
    next(e);
  }
};
