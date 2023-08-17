import mongoose, { connect } from "mongoose";
import UserModel from "./user.model";
import { Config } from "../config";
import { IUserModel } from "../types/user";

export interface IDb {
  UserModel: IUserModel;
}

export default async function InitDB(config: Config["db"]): Promise<IDb> {
  try {
    await connect(config.uri);
    console.log("Database connected");

    await UserModel.createCollection();

    return {
      UserModel,
    };
  } catch (e) {
    throw e;
  }
}
