import {Event} from "@/types/event";

export type User = {
  id?: string;
  name?: string;
  username?: string;
  gender?: string;
  phone?:string;
  age?:number|string;
  address?:string;
  role?:string;
  event?:Event;
  createdAt?:string;
};
