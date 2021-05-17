import {Malfunction} from "../../models/malfunctions";
import {IApiResponse} from "../../api/apiUtils";

export const reportMalfunctionMock = (bikeId: string, description: string): IApiResponse<Malfunction> => {
    return {
        isError: false,
        responseCode: 201,
        data: {
            id: '1',
            bikeId: bikeId,
            description: description,
            reportingUserId: '1'
        }
    }
}