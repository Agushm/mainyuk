import { User } from "./user";

export type UserTicket = {
    id: string;
    public_id: string;
    user_name: string;
    user_email: string;
    user_gender: string;
    user: User|null;
    user_id: string|null;
    ticket_id:string;
    created_at: string;
};