import { IApiResponse } from "../../api/apiUtils";
import { getReservedBikesResponse } from "../../api/bikes/getReservedBikes";

const reservedBikesMock = (): IApiResponse<getReservedBikesResponse> => {
    return {
        isError: false,
        responseCode: 200,
        data: {
            bikes: [
                {
                    id: "Andrzej",
                    station: { id: "123", name: "Rondo ONZ" },
                    reservedAt: new Date(Date.now() - (5 * 60 * 1000)).toJSON(),
                    reservedTill: new Date(Date.now() + (25 * 60 * 1000)).toJSON() // now + 30 minutes 
                },
                {
                    id: "Monika",
                    station: { id: "123", name: "Rondo ONZ" },
                    reservedAt: new Date(Date.now() - (10 * 60 * 1000)).toJSON(),
                    reservedTill: new Date(Date.now() + (20 * 60 * 1000)).toJSON() // now + 30 minutes 
                }
            ]
        }
    };
}

export default reservedBikesMock;