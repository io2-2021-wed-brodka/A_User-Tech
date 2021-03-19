import { Http2ServerResponse } from "http2"
import { IApiResponse } from "../../api/apiUtils";

const rentBikeMock = (): IApiResponse<Http2ServerResponse> =>
{
    return { isError: false,
            responseCode:201
        };
}

export default rentBikeMock;