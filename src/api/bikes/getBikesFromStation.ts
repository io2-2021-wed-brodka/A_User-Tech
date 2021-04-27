import { bikesFromStationMock } from "../../mock_data/bikes/bikesFromStationMock";
import { UnrentedBike } from "../../models/unrentedBike";
import { stations } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { getToken } from "../login/token";

export interface getBikesFromStationResponse {
    bikes: UnrentedBike[]
}

export const getBikesFromStation = async (stationId: string): Promise<IApiResponse<getBikesFromStationResponse>> => {

    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1
        || process.env.REACT_APP_BACKEND_URL === undefined)
        return bikesFromStationMock(stationId);

    let url = process.env.REACT_APP_BACKEND_URL + stations + stationId + "/bikes/";
    type T = IApiResponse<getBikesFromStationResponse>;
    return fetch(url, {
        method: "GET",
        // configure headers values on specification changes
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}