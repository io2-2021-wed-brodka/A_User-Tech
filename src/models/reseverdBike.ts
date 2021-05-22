import { Station } from "./station";

export interface ReservedBike {
    id: string;
    station: Station;
    reservedAt: string;
    reservedTill: string;
}