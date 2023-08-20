import { NextFunction, Request, Response } from "express";
import { IAppContext } from "../types/app";
import { IcreateBusRequestBody } from "../types/bus";

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
    const {
      vehicleNumber,
      model,
      yearOfMake,
      colour,
      numberOfSeats,
      status,
      insurance,
      roadWorthy,
    }: IcreateBusRequestBody = req.body;

    if (
      !vehicleNumber ||
      !model ||
      !numberOfSeats ||
      !yearOfMake ||
      !colour ||
      !status ||
      !insurance ||
      !roadWorthy
    ) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const _bus = await req.context.services?.bus.createOne({
      vehicleNumber,
      user: req.user._id,
      model,
      yearOfMake,
      colour,
      numberOfSeats,
      status,
      insurance,
      roadWorthy,
    });

    return res.status(200).json(_bus);
  } catch (e) {
    next(e);
  }
};
