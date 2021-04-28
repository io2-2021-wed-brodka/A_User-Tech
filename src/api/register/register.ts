import { registerMock } from "../../mock_data/register/registerMock";
import { register as registerUrl } from "../apiUrls";
import { handleError, handleResponse, IApiResponse, UseMock } from "../apiUtils";

export interface RegisterResponse {
    token: string;
}
export const register = async (username: string, password: string): Promise<IApiResponse<RegisterResponse>> => {

    if (UseMock())
        return registerMock(username, password);

    let url = process.env.REACT_APP_BACKEND_URL + registerUrl;
    type T = IApiResponse<RegisterResponse>;
    return fetch(url, {
        method: "POST",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(
            {
                login: username,
                password: password,
            })
    }).then<T>(handleResponse).catch<T>(handleError);
}