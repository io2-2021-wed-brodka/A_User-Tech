import { Station } from "./station";
import { User } from "./user";

export interface RentedBike {
    id: string,
    user: User,
    status: string
}