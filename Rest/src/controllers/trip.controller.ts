import { IAppContext } from "../types/app";

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext;
  }
}

import { NextFunction, Request, Response } from "express";
import { IcreateTicketRequestBody } from "../types/tickets";
import { IcreateTripRequestBody } from "../types/trips";

export const CREATE_ONE = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      date,
      arrivalTime,
      departureTime,
      destination,
      numberOfBusAssigned,
      origin,
      tripStatus,
      tripType,
    }: IcreateTripRequestBody = req.body;

    if (
      !date ||
      !arrivalTime ||
      !departureTime ||
      !destination ||
      !numberOfBusAssigned ||
      !origin ||
      !tripStatus ||
      !tripType
    ) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const _trip = await req.context.services?.trip.createOne({
      date,

      arrivalTime,
      departureTime,
      numberOfBusAssigned,
      origin,
      destination,
      tripStatus,
      tripType,
      user: req.user.user._id,
    });

    return res.status(200).json(_trip);
  } catch (e) {
    next(e);
  }
};
