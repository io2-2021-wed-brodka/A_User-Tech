import { IApiResponse } from "../../api/apiUtils";
import { GetActiveStationsResponse } from "../../api/stations/getActiveStations";

const getMockedStations = (): IApiResponse<GetActiveStationsResponse> => {

    return {
        isError: false,
        responseCode: 200,
        data: {
            stations: [
                { id: "123", name: "Rondo ONZ", activeBikesCount: 0 },
                { id: "125", name: "Ratusz Arsenał", activeBikesCount: 0 },
                { id: "126", name: "Ustro", activeBikesCount: 0 },
                { id: "2137", name: "Wadowice", activeBikesCount: 0 }
            ]
        }
    };
}

export default getMockedStations;