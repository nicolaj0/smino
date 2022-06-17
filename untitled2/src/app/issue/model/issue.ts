import {IUser} from "./i.user";

export interface Issue {
  id: number,
  title: string,
  requestedDate: Date,
  user: IUser
}
