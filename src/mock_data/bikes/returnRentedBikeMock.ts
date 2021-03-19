import { Http2ServerResponse } from "http2"
import { IApiResponse } from "../../api/apiUtils";

const returnRentedBikeMock = (): IApiResponse<Http2ServerResponse> =>
{
    return { isError: false,
            responseCode:200
        };
}

export default returnRentedBikeMock;