import { Station } from "./station";
import { User } from "./user";

export interface Bike {
    id: string,
    station: Station,
    user: User,
    status: string
}