import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { IJWT, IUser, IUserSchema } from "../types/user";
dotenv.config();

import createError from "../utils/error";

declare module "express-serve-static-core" {
  interface Request {
    user: IJWT;
  }
}

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;
  try {
    token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    if (!token) {
      throw new Error("No token");
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      function (err: any, decoded: any) {
        if (err) {
          next(createError("Token expired", 401));
        }
        req.user = decoded;
      }
    );

    next();
  } catch (err) {
    next(createError("Invalid access token", 401));
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IJWT;

  if (req.user.user.role === "ADMIN") {
    next();
  } else {
    console.log(req.user.user.fullName);
    console.log(req.user);
    return res.status(401).json({ message: "User is unauthorized" });
  }
};

export const isPhoneNumberVerified = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IJWT;

  if (user.user.isPhoneNumberVerified === true) {
    next();
  } else {
    return res.status(401).json({ message: "Phone number not verified" });
  }
};
