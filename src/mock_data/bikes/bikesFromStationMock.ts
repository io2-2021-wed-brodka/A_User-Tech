import { IApiResponse } from "../../api/apiUtils";
import { UnrentedBike } from "../../models/unrentedBike";

export const bikesFromStationMock = (stationId: string): IApiResponse<UnrentedBike[]> =>
{
    const bikes = [
    {id:"1", stationId:"123" },
    {id:"2", stationId:"123" },
    {id:"3", stationId:"123" },
    {id:"4", stationId:"123" },
    {id:"5", stationId:"124" },
    {id:"6", stationId:"124" },
    {id:"7", stationId:"124" },
    {id:"8", stationId:"126" },
    {id:"9", stationId:"126" },
    {id:"10", stationId:"126" },
    {id:"11", stationId:"126" },
    {id:"12", stationId:"126" },
    {id:"13", stationId:"125" },
    {id:"14", stationId:"125" },
    {id:"15", stationId:"125" },
    {id:"16", stationId:"125" },
    {id:"17", stationId:"125" },
    {id:"18", stationId:"125" },
    {id:"19", stationId:"125" },
    {id:"20", stationId:"125" },
    {id:"21", stationId:"125" },
    {id:"22", stationId:"125" },
    {id:"23", stationId:"125" },
    {id:"24", stationId:"125" },
    {id:"25", stationId:"125" },
    {id:"26", stationId:"125" },
    {id:"27", stationId:"125" },
    {id:"28", stationId:"125" },
    {id:"29", stationId:"125" },
    {id:"30", stationId:"125"}];

    return {
        isError: false,
        responseCode: 200,
        data: bikes.filter(x => x.stationId===stationId)
                    .map(y => {
                        return {id: y.id} as UnrentedBike;
                    })
    };   
}