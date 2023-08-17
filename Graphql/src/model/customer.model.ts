import mongoose, { Schema, model, SchemaTypes } from "mongoose";
import { ICustomerModel, ICustomerSchema } from "../types/customer";

const customerSchema = new Schema<ICustomerSchema>(
  {
    fullname: {
      type: SchemaTypes.String,
      required: true,
    },
    transaction_date: {
      type: SchemaTypes.Date,
      required: true,
    },
    product: {
      type: SchemaTypes.String,
      required: true,
    },
    category: {
      type: SchemaTypes.String,
      required: true,
    },
    price: {
        type: SchemaTypes.Number,
      required: true,
    },
    quantity: {
      type: SchemaTypes.Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ICustomerModel>("Customer", customerSchema);
