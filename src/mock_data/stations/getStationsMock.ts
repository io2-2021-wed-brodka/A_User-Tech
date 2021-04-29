import { IApiResponse } from "../../api/apiUtils";
import { GetActiveStationsResponse } from "../../api/stations/getActiveStations";

const getMockedStations = (): IApiResponse<GetActiveStationsResponse> => {

    return {
        isError: false,
        responseCode: 200,
        data: {
            stations: [
                { id: "123", name: "Rondo ONZ" },
                { id: "125", name: "Ratusz Arsenał" },
                { id: "126", name: "Ustro" },
                { id: "2137", name: "Wadowice" }
            ]
        }
    };
}

export default getMockedStations;