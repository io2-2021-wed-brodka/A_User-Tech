import { act, cleanup, fireEvent, RenderResult } from '@testing-library/react';
import React from 'react';
import 'regenerator-runtime/runtime';
import { getBikesFromStation } from '../../../../api/bikes/getBikesFromStation';
import { rentBike } from '../../../../api/bikes/rentBike';
import { UnrentedBike } from '../../../../models/unrentedBike';
import MainPage from '../../../../pages/mainPage/MainPage';
import StationBikesList from '../../../../pages/mainPage/rentPart/StationBikesList';
import { render } from '../../../test-utils';

afterEach(cleanup);

jest.mock('../../../../api/bikes/getBikesFromStation');
jest.mock('../../../../api/bikes/rentBike');

const mockedGetBikesFromStation = getBikesFromStation as jest.MockedFunction<typeof getBikesFromStation>;
const bikes: UnrentedBike[] = [{ id: "2137" }, { id: "2138" }];
const resp2 = { isError: false, responseCode: 200, data: bikes }
mockedGetBikesFromStation.mockResolvedValue(resp2);

const mockedRentBike = rentBike as jest.MockedFunction<typeof rentBike>;
const resp = { isError: false, responseCode: 201, }
mockedRentBike.mockResolvedValue(resp);

it("Bikes ids exisit on list", async () => {
    let renderResult = {} as RenderResult;

    await act(async () => {
        renderResult = render(
            <StationBikesList station={{ id: "2", name: "Na rynku w Barlinku", bikes: bikes }} setStations={(a: any) => { return; }} addRentedBike={(a: any) => { return; }} />
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
            <StationBikesList station={{ id: "2", name: "Na rynku w Barlinku", bikes: bikes }} setStations={(a: any) => { return; }} addRentedBike={(a: any) => { return; }} />
        );
    });

    await act(async () => {
        fireEvent.click(renderResult.getAllByRole('button')[0]);
    });

    expect(renderResult.getByRole('dialog')).toBeDefined();
})

it("Renting bike should show success message", async () => {
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <StationBikesList station={{ id: "2", name: "Na rynku w Barlinku", bikes: bikes }} setStations={(a: any) => { return; }} addRentedBike={(a: any) => { return; }} />
        );
    });

    await act(async () => {
        fireEvent.click(renderResult.getAllByRole('button')[0]);
    });

    expect(renderResult.getByRole('dialog')).toBeDefined();
    const buttons = renderResult.getAllByRole('button');
    const acceptButton = buttons.find(button => {
        return button.innerHTML.indexOf("Yes") != -1;
    })
    expect(acceptButton).toBeDefined();
    if (!acceptButton) {
        return;
    }
    await act(async () => {
        fireEvent.click(acceptButton);
    });
    expect(renderResult.getByText('Bike rented')).toBeDefined();
})