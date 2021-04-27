import { IApiResponse } from "../../api/apiUtils";
import { getRentedBikesResponse } from "../../api/bikes/rentedBikes";
const getMockedRentedBikes = (): IApiResponse<getRentedBikesResponse> => {

    return {
        isError: false,
        responseCode: 200,
        data: {
            bikes: [
                { id: "2137", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice" } },
                { id: "2138", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice" } },
                { id: "SPEED", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice" } },
            ]
        }
    };
}

export default getMockedRentedBikes;