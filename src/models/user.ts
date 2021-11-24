import {UserAddress} from "./user-address";
import {UserCompany} from "./user-company";

export interface User {
  id: number;
  name: string;
  username: any;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
}