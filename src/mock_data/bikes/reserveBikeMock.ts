import { IApiResponse } from "../../api/apiUtils";
import { ReservedBike } from "../../models/reseverdBike";

const reserveBikeMock = (): IApiResponse<ReservedBike> => {
    return {
        isError: false,
        responseCode: 200,
        data: {
            id: "Andrzej",
            station: { id: "123", name: "Rondo ONZ", activeBikesCount: 0 },
            reservedAt: new Date().toJSON(),
            reservedTill: new Date(Date.now() + (30 * 60 * 1000)).toJSON() // now + 30 minutes 
        }
    };
}

export default reserveBikeMock;