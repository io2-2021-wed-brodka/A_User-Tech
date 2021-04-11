import { Http2ServerResponse } from "http2";
import { loginMock } from "../../mock_data/login/bikesFromStationMock";
import { login as loginUrl } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";

export interface Token {
    token: string;
}
export const login = async (username: string, password: string): Promise<IApiResponse<Token>> => {

    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1
        || process.env.REACT_APP_BACKEND_URL === undefined)
        return loginMock(username, password);

    let url = process.env.REACT_APP_BACKEND_URL + loginUrl;
    type T = IApiResponse<Token>;
    return fetch(url, {
        method: "POST",
        // configure headers values on specification changes
        headers: new Headers(),
        body: JSON.stringify(
            {
                login: username,
                password: password,
                role: "user",
            })
    }).then<T>(handleResponse).catch<T>(handleError);
}