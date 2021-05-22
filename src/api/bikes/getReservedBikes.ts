import { getToken } from "../../authorization/authUtils";
import reservedBikesMock from "../../mock_data/bikes/reservedBikesMock";
import { ReservedBike } from "../../models/reseverdBike";
import { bikes } from "../apiUrls";
import { handleError, handleResponse, IApiResponse, UseMock } from "../apiUtils";

export interface getReservedBikesResponse {
    bikes: ReservedBike[];
}

export const getReservedBikes = async (): Promise<IApiResponse<getReservedBikesResponse>> => {
    if (UseMock())
        return reservedBikesMock();

    let url = process.env.REACT_APP_BACKEND_URL + bikes + "reserved";
    type T = IApiResponse<getReservedBikesResponse>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}