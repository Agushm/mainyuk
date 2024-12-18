import { Ticket } from "./ticket";
import { User } from "./user";
import { Event } from "./event";
import { Order } from "./order";

export type UserTicket = {
  id?: string;
  public_id?: string;
  user_name?: string;
  user_email?: string;
  user_gender?: string;
  user?: User | null;
  user_id?: string | null;
  ticket_id?: string | null;
  event_id?: string | null;
  event?:Event |null;
  ticket?:Ticket|null;
  order?:Order|null;
  created_at?: string;
};
