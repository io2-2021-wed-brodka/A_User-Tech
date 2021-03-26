import { act, cleanup, fireEvent, RenderResult } from '@testing-library/react';
import React from 'react';
import 'regenerator-runtime/runtime';
import { getBikesFromStation } from '../../../../api/bikes/getBikesFromStation';
import { UnrentedBike } from '../../../../models/unrentedBike';
import StationBikesList from '../../../../pages/mainPage/rentPart/StationBikesList';
import { render } from '../../../test-utils';

afterEach(cleanup);

jest.mock('../../../../api/bikes/getBikesFromStation');

const mockedGetBikesFromStation = getBikesFromStation as jest.MockedFunction<typeof getBikesFromStation>;
const bikes: UnrentedBike[] = [{ id: "2137" }, { id: "2138" }];
const resp2 = { isError: false, responseCode: 200, data: bikes }
mockedGetBikesFromStation.mockResolvedValue(resp2);

it("Bikes ids exisit on list", async () => {
    let renderResult = {} as RenderResult;

    await act(async () => {
        renderResult = render(
            <StationBikesList stationId={"1"} />
        );
    });

    bikes.forEach(bike => {
        expect(renderResult.getByText(bike.id)).toBeDefined();
    });
})

it("Click on bike should show confirm pop-up", async () => {
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <StationBikesList stationId={"1"} />
        );
    });

    await act(async () => {
        fireEvent.click(renderResult.getAllByRole('button')[0]);
    });

    expect(renderResult.getByRole('dialog')).toBeDefined();
})
