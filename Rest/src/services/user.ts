import { Types, ObjectId } from "mongoose";
import { IAppContext, IService } from "../types/app";
import {
  ISigninInput,
  IUserAuth,
  IUserInput,
  IUserwithoutPassWord,
} from "../types/user";

import createError from "../utils/error";
import { _generateToken } from "../utils/token";
import { __generateQuery } from "../utils/query";

export default class UserService extends IService {
  constructor(appContext: IAppContext) {
    super(appContext);
  }

  async CreateOne(input: IUserInput): Promise<IUserAuth> {
    try {
      const _user = await this.db.UserModel.findOne({
        email: input.email,
      });

      if (_user) {
        throw createError("User already exits", 400);
      }
      const usersNameFirstLetter = input.fullName.split(" ")[0];

      const user = new this.db.UserModel({
        ...input,
        profilePic: usersNameFirstLetter,
        role: "USER",
      });
      await user.save();

      const savedUser = await this.db.UserModel.findById(user._id).select(
        "-password"
      );

      const token = _generateToken(user);
      const userAuth: IUserAuth = {
        user: savedUser as IUserwithoutPassWord,
        token: token,
      };

      return userAuth;
    } catch (e) {
      throw e;
    }
  }

  async signIn(input: ISigninInput): Promise<IUserAuth | string> {
    try {
      const user = await this.db.UserModel.findOne({ email: input.email });

      if (!user) {
        throw createError("User not found", 404);
      }

      const isPasswordValid = await user.comparePasswords(input.password);

      if (!isPasswordValid) {
        return "Invalid password";
      } else {
        const token = _generateToken(user);
        const userAuth: IUserAuth = {
          user: user as IUserwithoutPassWord,
          token: token,
        };

        return userAuth;
      }
    } catch (e: any) {
      throw createError(e.message, 500);
    }
  }

  async CreateAdmin(input: IUserInput): Promise<IUserAuth> {
    try {
      const _user = await this.db.UserModel.findOne({
        email: input.email,
      });

      if (_user) {
        throw createError("User already exits", 400);
      }
      const usersNameFirstLetter = input.fullName.split(" ")[0];

      const user = new this.db.UserModel({
        ...input,
        profilePic: usersNameFirstLetter,
        role: "ADMIN",
      });
      await user.save();

      const savedUser = await this.db.UserModel.findById(user._id).select(
        "-password"
      );

      const token = _generateToken(user);
      const userAuth: IUserAuth = {
        user: savedUser as IUserwithoutPassWord,
        token: token,
      };

      return userAuth;
    } catch (e) {
      throw e;
    }
  }

  async getUser(input: { id: Types.ObjectId; skip: number; limit: number }) {
    const generatedQuery = __generateQuery("User", {
      filter: { _id: { eq: input.id } },
      populate: [
        "Tickets",
        "Bookings.Trip",
        "Bookings.Bus",
        "Bookings.Trip.user",
      ],

      pagination: { skip: input.skip * input.limit, limit: input.limit },
      sort: { email: "asc" },
    });

    try {
      const user = await this.db.UserModel.findOne(generatedQuery.filter)
        .sort(generatedQuery.sort)
        .skip(generatedQuery.skip)
        .limit(generatedQuery.limit)
        .populate(generatedQuery.populate)
        .exec();

      if (!user) {
        throw createError("User not found", 404);
      }

      return user;
    } catch (e) {
      throw e;
    }
  }
}
