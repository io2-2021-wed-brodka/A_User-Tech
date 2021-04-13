import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { bikes } from "../apiUrls";
import { Http2ServerResponse } from "http2";
import rentBikeMock from "../../mock_data/bikes/rentBikeMock";
import { getToken } from "../login/token";


export const rentBike = async (bikeId: string): Promise<IApiResponse<Http2ServerResponse>> => {

    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1
        || process.env.REACT_APP_BACKEND_URL === undefined)
        return rentBikeMock();

    let url = process.env.REACT_APP_BACKEND_URL + bikes + "rented/";
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