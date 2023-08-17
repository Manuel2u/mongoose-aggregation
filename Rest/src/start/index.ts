import express, { NextFunction, Request, Response } from "express";
import customError from "../middlewares/customError";
const app = express();
import authRouter from "../routes/user";

import { Config } from "../config";
import { IAppContext } from "../types/app";
import InitDB from "../models";
import initServices from "../services";
// Use the operating time router with a base path
export const start = async (config: Config) => {
  try {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const appContext: IAppContext = {};

    appContext.db = await InitDB(config.db);

    appContext.services = await initServices(appContext);

    app.use((req: Request, res: Response, next: NextFunction) => {
      req.context = appContext;
      next();
    });

    //use routes
    app.use("/api/v1/auth", authRouter);

    //use custom error middleware
    app.use(customError);

    app.listen(config.app.port, () => {
      console.log(`🚀 server is running on ${config.app.port}`);
    });
  } catch (e) {
    throw e;
  }
};
