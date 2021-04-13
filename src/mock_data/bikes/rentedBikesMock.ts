import { Bike } from "../../models/bike";
import { IApiResponse } from "../../api/apiUtils";
const getMockedRentedBikes = (): IApiResponse<Bike[]> => {

    return {
        isError: false,
        responseCode: 200,
        data: [

        ]
    };
}

export default getMockedRentedBikes;