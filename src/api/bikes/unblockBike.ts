import { getToken } from "../../authorization/authUtils";
import unblockBikeMock from "../../mock_data/bikes/unblockBikeMock";
import { UnrentedBike } from "../../models/unrentedBike";
import { bikes } from "../apiUrls";
import { handleError, handleResponse, IApiResponse, UseMock } from "../apiUtils";


export const unblockBike = async (bikeId: string): Promise<IApiResponse<UnrentedBike>> => {

    if (UseMock())
        return unblockBikeMock();

    let url = process.env.REACT_APP_BACKEND_URL + bikes + "/blocked/" + bikeId;
    type T = IApiResponse<UnrentedBike>;
    return fetch(url, {
        method: "DELETE",
        headers: new Headers({
            'Accept': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}