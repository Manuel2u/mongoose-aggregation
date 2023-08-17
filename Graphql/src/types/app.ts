import { IDb } from "../model";
import { IServices } from "../services";

export interface IAppContext {
  db: IDb;
  services: IServices;
}

export class IService {
  db: IDb;
  constructor(props: IAppContext) {
    this.db = props.db;
  }
}
