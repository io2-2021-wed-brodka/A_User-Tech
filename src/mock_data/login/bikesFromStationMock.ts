import { IApiResponse } from "../../api/apiUtils";
import { LoginResponse } from "../../api/login/login";

export const loginMock = (username: string, password: string): IApiResponse<LoginResponse> => {


    return {
        isError: false,
        responseCode: 200,
        data: { token: "superbezpiecznytoken", role: "tech" }
    };
}