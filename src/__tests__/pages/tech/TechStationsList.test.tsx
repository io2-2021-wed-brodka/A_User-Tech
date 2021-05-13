import { act, cleanup, fireEvent, RenderResult } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "regenerator-runtime/runtime";
import { getBikesFromStation } from "../../../api/bikes/getBikesFromStation";
import { getAllStations } from "../../../api/stations/getAllStations";
import Topbar from "../../../layout/Topbar";
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

const mockedGetBikesFromStation = getBikesFromStation as jest.MockedFunction<typeof getBikesFromStation>;
const bikesResponse = bikesFromStationMock("1");
mockedGetBikesFromStation.mockResolvedValue(bikesResponse);

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

it("Stations should contains bikes lists", async () => {
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <TechStationsList />
        );
    });
    const stationsList = renderResult.getByRole("list");
    expect(stationsList).toBeDefined();

    response.data?.stations.forEach(station => {
        const stationHtml = renderResult.getByText(station.name);
        bikesResponse.data?.bikes.forEach(bike => {
            expect(stationHtml).toContain(bike.id);
        });

    })


});
