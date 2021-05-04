import { IApiResponse } from "../../api/apiUtils";
import { RegisterResponse } from "../../api/register/register";

export const registerMock = (username: string, password: string): IApiResponse<RegisterResponse> => {

    return {
        isError: false,
        responseCode: 200,
        data: { token: "superbezpiecznytoken" }
    };
}