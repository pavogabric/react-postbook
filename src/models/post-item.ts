import {User} from "./user";

export interface PostItem {
  userId: number;
  user?: User;
  id: number;
  title: string;
  body: string;
}