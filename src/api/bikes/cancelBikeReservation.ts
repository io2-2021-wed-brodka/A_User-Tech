import { Http2ServerResponse } from "http2";
import { getToken } from "../../authorization/authUtils";
import ok204Mock from "../../mock_data/bikes/ok204Mock";
import { bikes } from "../apiUrls";
import { handleError, handleResponse, IApiResponse, UseMock } from "../apiUtils";

export const cancelBikeReservation = async (bikeId: string): Promise<IApiResponse<Http2ServerResponse>> => {
    if (UseMock())
        return ok204Mock();

    let url = process.env.REACT_APP_BACKEND_URL + bikes + "reserved/" + bikeId;
    type T = IApiResponse<Http2ServerResponse>;
    return fetch(url, {
        method: "DELETE",
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