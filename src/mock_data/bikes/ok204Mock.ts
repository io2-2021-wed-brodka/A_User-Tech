import { Http2ServerResponse } from "http2"
import { IApiResponse } from "../../api/apiUtils";

const ok204Mock = (): IApiResponse<Http2ServerResponse> => {
    return {
        isError: false,
        responseCode: 204,
    };
}

export default ok204Mock;