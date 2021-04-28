import { handleError, handleResponse, IApiResponse, UseMock } from "../apiUtils";
import { stations } from "../apiUrls";
import { Http2ServerResponse } from "http2";
import returnRentedBikeMock from "../../mock_data/bikes/returnRentedBikeMock";
import { getToken } from "../../authorization/authUtils";

export const returnRentedBike = async (bikeId: string, stationId: string): Promise<IApiResponse<Http2ServerResponse>> => {

    if (UseMock())
        return returnRentedBikeMock();

    let url = process.env.REACT_APP_BACKEND_URL + stations + stationId + "/bikes/";
    type T = IApiResponse<Http2ServerResponse>;
    return fetch(url, {
        method: "POST",
        // configure headers values on specification changes
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
        body: JSON.stringify(
            {
                id: bikeId
            })
    }).then<T>(handleResponse).catch<T>(handleError);
}