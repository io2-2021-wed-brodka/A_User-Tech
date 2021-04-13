import { Bike } from "../../models/bike"
import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { stations } from "../apiUrls";
import { bikesFromStationMock } from "../../mock_data/bikes/bikesFromStationMock";
import { UnrentedBike } from "../../models/unrentedBike";
import { getToken } from "../login/token";

export const getBikesFromStation = async (stationId: string): Promise<IApiResponse<UnrentedBike[]>> => {

    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1
        || process.env.REACT_APP_BACKEND_URL === undefined)
        return bikesFromStationMock(stationId);

    let url = process.env.REACT_APP_BACKEND_URL + stations + stationId + "/bikes";
    type T = IApiResponse<Bike[]>;
    return fetch(url, {
        method: "GET",
        // configure headers values on specification changes
        headers: new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'x-bearerToken': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}