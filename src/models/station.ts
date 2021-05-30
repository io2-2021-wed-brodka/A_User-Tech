import { UnrentedBike } from "./unrentedBike";

export interface Station {
    id: string,
    name: string,
    activeBikesCount: number;
}

export interface StationWithBikes {
    id: string,
    name: string,
    bikes: UnrentedBike[],
    activeBikesCount: number;
}