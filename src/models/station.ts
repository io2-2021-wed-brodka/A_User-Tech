import { UnrentedBike } from "./unrentedBike";

export interface Station {
    id: string,
    name: string
}

export interface StationWithBikes {
    id: string,
    name: string,
    bikes: UnrentedBike[],
}