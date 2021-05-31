import { handleError, handleResponse, IApiResponse, UseMock } from "../apiUtils";
import { Station } from "../../models/station";
import getMockedStations from "../../mock_data/stations/getStationsMock";
import { stations } from "../apiUrls";
import { getToken } from "../../authorization/authUtils";

export interface GetAllStationsResponse {
    stations: Station[]
}

export const getAllStations = async (): Promise<IApiResponse<GetAllStationsResponse>> => {

    if (UseMock())
        return getMockedStations();

    let url = process.env.REACT_APP_BACKEND_URL + stations;
    type T = IApiResponse<GetAllStationsResponse>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}