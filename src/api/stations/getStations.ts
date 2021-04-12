import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { Station } from "../../models/station";
import getMockedStations from "../../mock_data/stations/getStationsMock";
import { stations } from "../apiUrls";
import { getToken } from "../login/token";


export const getStations = async (): Promise<IApiResponse<Station[]>> => {

    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1
        || process.env.REACT_APP_BACKEND_URL === undefined)
        return getMockedStations();

    let url = process.env.REACT_APP_BACKEND_URL + stations;
    type T = IApiResponse<Station[]>;
    return fetch(url, {
        method: "GET",
        // configure headers values on specification changes
        headers: {
            'x-bearerToken': getToken(),
        },
    }).then<T>(handleResponse).catch<T>(handleError);
}