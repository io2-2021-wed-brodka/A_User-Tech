import { IApiResponse } from "../../api/apiUtils";
import { Station } from "../../models/station";

const getMockedStations = (): IApiResponse<Station[]> => {

    return {
        isError: false,
        responseCode: 200,
        data:[
            { id: "123", name: "Rondo ONZ"},
            { id: "125", name: "Ratusz Arsenał"},
            { id: "126", name: "Ustro"},
            { id: "2137", name: "Wadowice"}
        ]
    };
}

export default getMockedStations;