import { Model, Document, Types } from "mongoose";

export interface IUser {
  fullName: string;
  phone: string;
  email: string;
  profilePic: string;
  password: string;
  isPhoneNumberVerified: boolean;
  isEmailVerified: boolean;
  role: "USER";
  googleID?: string;
  appleID?: string;
  faceBookID?: string;
  busCompany?: string;
  Bookings: Types.ObjectId[];
  Tickets: Types.ObjectId[];
  comparePasswords(password: string): Promise<boolean>;
}

export interface IUserwithoutPassWord {
  _id: Types.ObjectId;
  fullName: string;
  phone: string;
  email: string;
  isPhoneNumberVerified: boolean;
  verificationCode?: Types.ObjectId;
  comparePasswords(password: string): Promise<boolean>;
}

export interface IUserAuth {
  user: IUserwithoutPassWord;
  token?: string;
}

export interface IUserInput {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}
export interface ISigninInput {
  email: string;
  password: string;
}

export interface IUserSchema extends IUser, Document {
  _id: Types.ObjectId;
  comparePasswords(password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends Model<IUserSchema> {}
