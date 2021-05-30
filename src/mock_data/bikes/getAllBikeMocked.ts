import { IApiResponse } from "../../api/apiUtils";
import { GetRentedBikesResponse } from "../../api/bikes/getRentedBikes";

const getAllBikeMocked = (): IApiResponse<GetRentedBikesResponse> => {

    return {
        isError: false,
        responseCode: 200,
        data: {
            bikes: [
                { id: "1", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice", activeBikesCount: 0 } },
                { id: "2", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice", activeBikesCount: 0 } },
                { id: "3", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice", activeBikesCount: 0 } },
                { id: "2137", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice", activeBikesCount: 0 } },
                { id: "Peja", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice", activeBikesCount: 0 } },
            ]
        }
    };
}

export default getAllBikeMocked;