import { Bike } from "../../models/bike";
import { IApiResponse } from "../../api/apiUtils";
const getMockedRentedBikes = (): IApiResponse<Bike[]> => {

    return {
        isError: false,
        responseCode: 200,
        data: [
            { id: "2137", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice" } },
            { id: "2138", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice" } },
            { id: "SPEED", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice" } },
        ]
    };
}

export default getMockedRentedBikes;