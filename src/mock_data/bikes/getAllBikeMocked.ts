import { IApiResponse } from "../../api/apiUtils";
import { GetRentedBikesResponse } from "../../api/bikes/getRentedBikes";

const getAllBikeMocked = (): IApiResponse<GetRentedBikesResponse> => {

    return {
        isError: false,
        responseCode: 200,
        data: {
            bikes: [
                { id: "1", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice" } },
                { id: "2", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice" } },
                { id: "3", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice" } },
                { id: "2137", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice" } },
                { id: "Peja", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice" } },
            ]
        }
    };
}

export default getAllBikeMocked;