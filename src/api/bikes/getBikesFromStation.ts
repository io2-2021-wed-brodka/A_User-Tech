import { Bike } from "../../models/bike"
import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { bikes } from "../apiUrls";
import { bikesFromStationMock } from "../../mock_data/bikes/bikesFromStationMock";
import { UnrentedBike } from "../../models/unrentedBike";

export const  getBikesFromStation = async (stationId: string): Promise<IApiResponse<UnrentedBike[]>> => {

    if(parseInt(process.env.REACT_APP_MOCK_DATA || "0" ) === 1 
        || process.env.REACT_APP_BACKEND_URL === undefined)
        return bikesFromStationMock(stationId);

    let url = process.env.REACT_APP_BACKEND_URL + bikes + stationId;
    type T = IApiResponse<Bike[]>;
    return fetch(url, {
        method: "GET",
        // configure headers values on specification changes
        headers: new Headers() 
    }).then<T>(handleResponse).catch<T>(handleError);
}