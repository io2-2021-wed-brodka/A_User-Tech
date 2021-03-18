import { Bike } from "../../models/bike"


export const getRentedBikes = async (): Promise<Bike[]> => {

    return [
        { id: "123", rentalStationName: "rondo ONZ", rentalTimestamp: new Date(2021, 2, 1, 14, 21, 41) },
        { id: "124", rentalStationName: "rondo ONZ", rentalTimestamp: new Date(2021, 2, 1, 15, 41, 41) },
        { id: "125", rentalStationName: "Ratusz Arsenał", rentalTimestamp: new Date(2021, 2, 1, 13, 15, 41) },
        { id: "126", rentalStationName: "Ustro", rentalTimestamp: new Date(2021, 1, 1, 14, 12, 41) },
    ]
}