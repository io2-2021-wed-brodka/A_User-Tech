import { bikesFromStationMock } from "../../mock_data/bikes/bikesFromStationMock";
import { UnrentedBike } from "../../models/unrentedBike";
import { stations } from "../apiUrls";
import { handleError, handleResponse, IApiResponse, UseMock } from "../apiUtils";
import { getToken } from "../../authorization/authUtils";

export interface GetBikesFromStationResponse {
    bikes: UnrentedBike[]
}

const getBikesFromStation = async (stationId: string, url: string): Promise<IApiResponse<GetBikesFromStationResponse>> => {

    if (UseMock())
        return bikesFromStationMock(stationId);

    type T = IApiResponse<GetBikesFromStationResponse>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}

export const getActiveBikesFromStation = async (stationId: string): Promise<IApiResponse<GetBikesFromStationResponse>> => {
    let url = process.env.REACT_APP_BACKEND_URL + stations + "/" + stationId + "/bikes";
    return getBikesFromStation(stationId, url);
}
