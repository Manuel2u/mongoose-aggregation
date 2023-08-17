import { Document, Types,Model } from "mongoose";

export interface ICustomer {
  fullname: string;
  transaction_date: Date;
  product: string;
  category: string;
  price: number;
  quantity: number;
}


export interface ICustomerSchema extends Document, ICustomer {
    _id : Types.ObjectId,
    createdAt : Date,
    updatedAt : Date
}

export interface ICustomerModel extends Model <ICustomerSchema> {}