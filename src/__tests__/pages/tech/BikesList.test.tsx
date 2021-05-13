import { act, cleanup, fireEvent, RenderResult } from "@testing-library/react";
import React from "react";
import "regenerator-runtime/runtime";
import { blockBike } from "../../../api/bikes/blockBike";
import { getBikesFromStation } from "../../../api/bikes/getBikesFromStation";
import { unblockBike } from "../../../api/bikes/unblockBike";
import { bikesFromStationMock } from "../../../mock_data/bikes/bikesFromStationMock";
import blockBikeMock from "../../../mock_data/bikes/blockBikeMock";
import unblockBikeMock from "../../../mock_data/bikes/unblockBikeMock";
import BikesList from "../../../pages/tech/BikesList";
import TechStationsList from "../../../pages/tech/TechStationsList";
import { render } from "../../test-utils";

afterEach(cleanup);


jest.mock('../../../api/bikes/getBikesFromStation');
jest.mock('../../../api/bikes/unblockBike');
jest.mock('../../../api/bikes/blockBike');

const mockedGetBikesFromStation = getBikesFromStation as jest.MockedFunction<typeof getBikesFromStation>;
const bikesResponse = bikesFromStationMock("1");
mockedGetBikesFromStation.mockResolvedValue(bikesResponse);

const mockedBlockBike = blockBike as jest.MockedFunction<typeof blockBike>;
const blockResponse = blockBikeMock("1");
mockedBlockBike.mockResolvedValue(blockResponse);

const mockedUnblockBike = unblockBike as jest.MockedFunction<typeof unblockBike>;
const unblockResponse = unblockBikeMock();
mockedUnblockBike.mockResolvedValue(unblockResponse);

it("All bikes should show up on list", async () => {
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <BikesList stationId={"1"} />
        );
    });

    bikesResponse.data?.bikes.forEach(bike => {
        expect(renderResult.getByText(bike.id)).toBeDefined();
    });
});

it("Clicking on button should change state", async () => {
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <BikesList stationId={"1"} />
        );
    });
    const buttons = renderResult.queryAllByRole("button");
    for await (const button of buttons) {
        let block = true;
        let index = button.innerHTML.indexOf("Block");
        if (index < 0) {
            block = false;
            index = button.innerHTML.indexOf("Unblock");
        }
        expect(index).toBeGreaterThanOrEqual(0);
        await act(async () => {
            fireEvent.click(button);
        });

        if (block) {
            expect(button.innerHTML).toContain("Unblock");
            expect(button.innerHTML).not.toContain("Block");
        }
        else {
            expect(button.innerHTML).toContain("Block");
            expect(button.innerHTML).not.toContain("Unblock");
        }
    };
});

it("Failed bike block should show error message", async () => {
    mockedBlockBike.mockResolvedValue({ isError: true, responseCode: 404 });
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <BikesList stationId={"1"} />
        );
    });
    const buttons = renderResult.queryAllByRole("button");
    for await (const button of buttons) {
        let block = true;
        let index = button.innerHTML.indexOf("Block");
        if (index < 0) {
            block = false;
            index = button.innerHTML.indexOf("Unblock");
        }
        expect(index).toBeGreaterThanOrEqual(0);
        await act(async () => {
            fireEvent.click(button);
        });

        if (block) {
            expect(renderResult.getByText("Failed to block bike:")).toBeDefined();

        }
        else {
            expect(renderResult.getByText("Failed to unblock bike:")).toBeDefined();
        }
    };
});