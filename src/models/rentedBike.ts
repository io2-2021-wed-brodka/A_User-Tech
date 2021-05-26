import { Station } from "./station";
import { User } from "./user";

export interface RentedBike {
    id: string,
    station: Station,
    user: User,
    status: string
}