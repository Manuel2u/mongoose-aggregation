import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const DBURI = (): string | undefined => {
  if (process.env.NODE_ENV === "development") {
    return process.env.DEV_MONGO_URI;
  } else if (process.env.NODE_ENV === "test") {
    return process.env.PROD_MONGO_URI;
  }
};

export const DBCONNECT = async () => {
  try {
    const uri = DBURI() as string;
    await connect(uri, { autoIndex: true });
    console.log();
  } catch (e: any) {
    console.log(e.message);
  }
};
