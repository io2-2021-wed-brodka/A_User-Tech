import { Http2ServerResponse } from "http2";
import { getToken } from "../../authorization/authUtils";
import ok204Mock from "../../mock_data/bikes/ok204Mock";
import { malfunctions } from "../apiUrls";
import { handleError, handleResponse, IApiResponse, UseMock } from "../apiUtils";

export const deleteMalfunction = async (id: string): Promise<IApiResponse<Http2ServerResponse>> => {
    if (UseMock())
        return ok204Mock();

    let url = `${process.env.REACT_APP_BACKEND_URL}${malfunctions}/${id}`;
    type T = IApiResponse<Http2ServerResponse>;
    return fetch(url, {
        method: "DELETE",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}
