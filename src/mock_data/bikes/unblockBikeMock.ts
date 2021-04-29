import { IApiResponse } from "../../api/apiUtils";
import { UnrentedBike } from "../../models/unrentedBike";

const unblockBikeMock = (): IApiResponse<UnrentedBike> => {

    return {
        isError: false,
        responseCode: 204,
    };
}

export default unblockBikeMock;