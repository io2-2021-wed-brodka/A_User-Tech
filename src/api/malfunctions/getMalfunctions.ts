import { getToken } from "../../authorization/authUtils";
import { getMalfunctionsMocked } from "../../mock_data/malfunctions/getMalfunctionsMocked";
import { Malfunction } from "../../models/malfunctions";
import { handleError, handleResponse, IApiResponse, UseMock } from "../apiUtils";

export interface GetMalfunctionsResponse {
    malfunctions: Malfunction[]
}

export const getMalfunctions = async (): Promise<IApiResponse<GetMalfunctionsResponse>> => {

    if (UseMock())
        return getMalfunctionsMocked();

    let url = process.env.REACT_APP_BACKEND_URL + "malfunctions";
    type T = IApiResponse<GetMalfunctionsResponse>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            'Authorization': getToken(),
        })
    }).then<T>(handleResponse).catch<T>(handleError);
}
