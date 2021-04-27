import { RentedBike } from "../../models/bike"
import getMockedRentedBikes from '../../mock_data/bikes/rentedBikesMock';
import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { bikes } from "../apiUrls";
import { getToken } from "../login/token";

export interface getRentedBikesResponse {
    bikes: RentedBike[]
}

export const getRentedBikes = async (): Promise<IApiResponse<getRentedBikesResponse>> => {

    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1
        || process.env.REACT_APP_BACKEND_URL === undefined)
        return getMockedRentedBikes();

    let url = process.env.REACT_APP_BACKEND_URL + bikes + "rented/";
    type T = IApiResponse<getRentedBikesResponse>;
    return fetch(url, {
        method: "GET",
        // configure headers values on specification changes
        headers: new Headers({
            'Accept': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}