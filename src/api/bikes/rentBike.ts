import { handleError, handleResponse, IApiResponse, UseMock } from "../apiUtils";
import { bikes } from "../apiUrls";
import { Http2ServerResponse } from "http2";
import rentBikeMock from "../../mock_data/bikes/rentBikeMock";
import { getToken } from "../../authorization/authUtils";


export const rentBike = async (bikeId: string): Promise<IApiResponse<Http2ServerResponse>> => {

    if (UseMock())
        return rentBikeMock();

    let url = process.env.REACT_APP_BACKEND_URL + bikes + "rented/";
    type T = IApiResponse<Http2ServerResponse>;
    return fetch(url, {
        method: "POST",
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