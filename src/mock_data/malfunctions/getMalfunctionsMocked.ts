import { IApiResponse } from "../../api/apiUtils";
import { GetMalfunctionsResponse } from "../../api/malfunctions/getMalfunctions";



export const getMalfunctionsMocked = (): IApiResponse<GetMalfunctionsResponse> => {
    return {
        isError: false,
        responseCode: 200,
        data: {
            malfunctions:
            [
                { 
                    id: '1',
                    bikeId: '1',
                    description: "EEE panie koła nie ma!!",
                    reportingUserId: "xD"
                },
                { 
                    id: '2',
                    bikeId: '2',
                    description: "Nie zmieniają się przerzutki",
                    reportingUserId: "21"
                },
                { 
                    id: '3',
                    bikeId: '21',
                    description: "EEE panie koła nie ma!!",
                    reportingUserId: "37"
                },
                { 
                    id: '1337',
                    bikeId: '37',
                    description: "Coś nie jeździ ten rower",
                    reportingUserId: "ups"
                }
            ]
        }
    }

    
}
