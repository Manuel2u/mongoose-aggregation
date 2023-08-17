import { IAppContext } from "../types/app";
import UserService from "./user";

export interface IServices {
  user: UserService;
}

export default async function initServices(context: IAppContext) {
  try {
    return {
      user: new UserService(context),
    };
  } catch (e) {
    throw e;
  }
}
