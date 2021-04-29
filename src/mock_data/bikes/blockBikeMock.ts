import { IApiResponse } from "../../api/apiUtils";
import { BikeStatus } from "../../models/bikeStatus";
import { UnrentedBike } from "../../models/unrentedBike";

const blockBikeMock = (bikeId: string): IApiResponse<UnrentedBike> => {

    return {
        isError: false,
        responseCode: 200,
        data:
            { id: bikeId, status: BikeStatus.blocked },
    };
}

export default blockBikeMock;