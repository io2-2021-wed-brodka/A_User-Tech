import { IApiResponse } from "../../api/apiUtils";
import { GetRentedBikesResponse } from "../../api/bikes/getRentedBikes";
const getMockedRentedBikes = (): IApiResponse<GetRentedBikesResponse> => {

    return {
        isError: false,
        responseCode: 200,
        data: {
            bikes: [
                { id: "2137", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice", activeBikesCount: 0 } },
                { id: "2138", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice", activeBikesCount: 0 } },
                { id: "SPEED", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice", activeBikesCount: 0 } },
            ]
        }
    };
}

export default getMockedRentedBikes;