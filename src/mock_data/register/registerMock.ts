import { IApiResponse } from "../../api/apiUtils";
import { Token } from "../../api/login/login";

export const registerMock = (username: string, password: string): IApiResponse<Token> => {

    return {
        isError: false,
        responseCode: 200,
        data: { token: "superbezpiecznytoken" }
    };
}