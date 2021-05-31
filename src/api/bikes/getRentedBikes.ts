import { RentedBike } from "../../models/rentedBike"
import getMockedRentedBikes from '../../mock_data/bikes/rentedBikesMock';
import { handleError, handleResponse, IApiResponse, UseMock } from "../apiUtils";
import { bikes } from "../apiUrls";
import { getToken } from "../../authorization/authUtils";

export interface GetRentedBikesResponse {
    bikes: RentedBike[]
}

export const getRentedBikes = async (): Promise<IApiResponse<GetRentedBikesResponse>> => {

    if (UseMock())
        return getMockedRentedBikes();

    let url = process.env.REACT_APP_BACKEND_URL + bikes + "rented/";
    type T = IApiResponse<GetRentedBikesResponse>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}