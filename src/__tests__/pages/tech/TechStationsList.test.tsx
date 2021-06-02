import { act, cleanup, RenderResult } from "@testing-library/react";
import React from "react";
import "regenerator-runtime/runtime";
import { getActiveBikesFromStation, getAllBikesFromStation } from "../../../api/bikes/getBikesFromStation";
import { getAllStations } from "../../../api/stations/getAllStations";
import { bikesFromStationMock } from "../../../mock_data/bikes/bikesFromStationMock";
import getMockedStations from "../../../mock_data/stations/getStationsMock";
import TechStationsList from "../../../pages/tech/TechStationsList";
import { render } from "../../test-utils";

afterEach(cleanup);


jest.mock('../../../api/stations/getAllStations');
jest.mock('../../../api/bikes/getBikesFromStation');


const mockedGetRentedBikes = getAllStations as jest.MockedFunction<typeof getAllStations>;
const response = getMockedStations();
mockedGetRentedBikes.mockResolvedValue(response);


it("Stations names should show up on list", async () => {
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <TechStationsList />
        );
    });

    response.data?.stations.forEach(station => {
        expect(renderResult.getAllByText(station.name).length).toBeGreaterThan(0);
    })


});

