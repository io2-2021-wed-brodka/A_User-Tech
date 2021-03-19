import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { bikes } from "../apiUrls";
import { Http2ServerResponse } from "http2";
import returnRentedBikeMock from "../../mock_data/bikes/returnRentedBikeMock";

export const returnRentedBike = async (bikeId: string, stationId: string): Promise<IApiResponse<Http2ServerResponse>> => {

    if(parseInt(process.env.REACT_APP_MOCK_DATA || "0" )===1 
        || process.env.REACT_APP_BACKEND_URL === undefined)
        return returnRentedBikeMock();

    let url = process.env.REACT_APP_BACKEND_URL + bikes + "rented";
    type T = IApiResponse<Http2ServerResponse>;
    return fetch(url, {
        method: "DELETE",
        // configure headers values on specification changes
        headers: new Headers(), 
        body: JSON.stringify(
            {
                bikeId: bikeId,
                stationId: stationId
            })
    }).then<T>(handleResponse).catch<T>(handleError);
}