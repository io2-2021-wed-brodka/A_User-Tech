import { handleError, handleResponse, IApiResponse, UseMock } from "../apiUtils";
import { Station } from "../../models/station";
import getMockedStations from "../../mock_data/stations/getStationsMock";
import { stations } from "../apiUrls";
import { getToken } from "../../authorization/authUtils";

export interface GetStationsResponse {
    stations: Station[]
}

export const getActiveStations = async (): Promise<IApiResponse<GetStationsResponse>> => {

    if (UseMock())
        return getMockedStations();

    let url = process.env.REACT_APP_BACKEND_URL + stations + 'active/';
    type T = IApiResponse<GetStationsResponse>;
    return fetch(url, {
        method: "GET",
        // configure headers values on specification changes
        headers: new Headers({
            'Accept': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}