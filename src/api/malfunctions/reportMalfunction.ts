import {handleError, handleResponse, IApiResponse} from "../apiUtils";
import {malfunctions} from "../apiUrls";
import {getToken} from "../../authorization/authUtils";
import {Malfunction} from "../../models/malfunctions";

export const reportMalfunction = async (bikeId: string, description: string): Promise<IApiResponse<Malfunction>> => {
    let url = `${process.env.REACT_APP_BACKEND_URL}${malfunctions}`;
    type T = IApiResponse<Malfunction>;
    return fetch(url, {
        method: "POST",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
        body: JSON.stringify({
            id: bikeId,
            description: description
        })
    }).then<T>(handleResponse).catch<T>(handleError);
}
