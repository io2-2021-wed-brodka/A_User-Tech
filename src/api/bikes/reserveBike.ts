import { getToken } from "../../authorization/authUtils";
import reserveBikeMock from "../../mock_data/bikes/reserveBikeMock";
import { ReservedBike } from "../../models/reseverdBike";
import { bikes } from "../apiUrls";
import { handleError, handleResponse, IApiResponse, UseMock } from "../apiUtils";

export const reserveBike = async (bikeId: string): Promise<IApiResponse<ReservedBike>> => {
    if (UseMock())
        return reserveBikeMock();

    let url = process.env.REACT_APP_BACKEND_URL + bikes + "reserved";
    type T = IApiResponse<ReservedBike>;
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