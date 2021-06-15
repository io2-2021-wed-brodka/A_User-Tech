import { getToken } from "../../authorization/authUtils";
import blockBikeMock from "../../mock_data/bikes/blockBikeMock";
import { UnrentedBike } from "../../models/unrentedBike";
import { bikes } from "../apiUrls";
import { handleError, handleResponse, IApiResponse, UseMock } from "../apiUtils";


export const blockBike = async (bikeId: string): Promise<IApiResponse<UnrentedBike>> => {

    if (UseMock())
        return blockBikeMock(bikeId);

    let url = process.env.REACT_APP_BACKEND_URL + bikes + "/blocked";
    type T = IApiResponse<UnrentedBike>;
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