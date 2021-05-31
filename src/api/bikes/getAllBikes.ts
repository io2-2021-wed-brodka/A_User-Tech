import { getToken } from "../../authorization/authUtils";
import getAllBikeMocked from "../../mock_data/bikes/getAllBikeMocked";
import { Bike } from "../../models/bike";
import { bikes } from "../apiUrls";
import { handleError, handleResponse, IApiResponse, UseMock } from "../apiUtils";

export interface GetRentedBikesResponse {
    bikes: Bike[]
}

export const getAllBikes = async (): Promise<IApiResponse<GetRentedBikesResponse>> => {

    if (UseMock())
        return getAllBikeMocked();

    let url = process.env.REACT_APP_BACKEND_URL + bikes;
    type T = IApiResponse<GetRentedBikesResponse>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}