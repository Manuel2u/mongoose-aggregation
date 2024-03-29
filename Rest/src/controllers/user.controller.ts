import { NextFunction, Request, Response } from "express";
import { IAppContext } from "../types/app";

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext;
  }
}

///*************************SIGNUP*************************** */
export const SIGNUP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      email,
      fullName,
      password,
      phone,
    }: {
      email: string;
      fullName: string;
      password: string;
      phone: string;
    } = req.body;

    if (!email || !fullName || !password || !phone) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const _user = await req.context.services?.user.CreateOne({
      email,
      fullName,
      password,
      phone,
    });

    return res.status(200).json(_user);
  } catch (e) {
    next(e);
  }
};

/***************************** SIGN IN ******************************/

export const SIGNIN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const user = await req.context.services?.user.signIn({ email, password });

    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const CREATEADMIN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      email,
      fullName,
      password,
      phone,
    }: {
      email: string;
      fullName: string;
      password: string;
      phone: string;
    } = req.body;

    if (!email || !fullName || !password || !phone) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const _user = await req.context.services?.user.CreateAdmin({
      email,
      fullName,
      password,
      phone,
    });

    return res.status(200).json(_user);
  } catch (e) {
    next(e);
  }
};

export const GET_USER = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skip = parseInt(req.query.skip as string); // Convert to number
    const limit = parseInt(req.query.limit as string); // Convert to number
    console.log(req.query);

    if (isNaN(skip) || isNaN(limit)) {
      return res
        .status(400)
        .json({ message: "Make sure all input fields are correct" });
    }
    const _user = await req.context.services?.user.getUser({
      id: req.user.user._id,
      limit,
      skip,
    });

    return res.status(200).json(_user);
  } catch (e) {
    next(e);
  }
};
