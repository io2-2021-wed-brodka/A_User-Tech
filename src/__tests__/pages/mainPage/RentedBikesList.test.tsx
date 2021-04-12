import { act, cleanup, fireEvent, RenderResult } from '@testing-library/react';
import React from 'react';
import 'regenerator-runtime/runtime';
import { getRentedBikes } from '../../../api/bikes/rentedBikes';
import { getStations } from '../../../api/stations/getStations';
import { Bike } from '../../../models/bike';
import { Station } from '../../../models/station';
import RentedBikesList from '../../../pages/mainPage/RentedBikesList';
import { render } from '../../test-utils';

afterEach(cleanup);

jest.mock('../../../api/bikes/rentedBikes');
jest.mock('../../../api/stations/getStations');


const mockedGetRentedBikes = getRentedBikes as jest.MockedFunction<typeof getRentedBikes>;
const bikes: Bike[] = [
    { id: "2137", rentalStationName: "Stacja Główna", rentalTimestamp: new Date(2011, 11, 11, 11, 11) },
    { id: "2138", rentalStationName: "Stacja Poboczna", rentalTimestamp: new Date(2012, 12, 12, 12, 12) },
    { id: "SPEED", rentalStationName: "Warszawa Zachodnia", rentalTimestamp: new Date(2012, 12, 15, 15, 15) },
];
const fullResponse = { isError: false, responseCode: 200, data: bikes }
const emptyResponse = { isError: false, responseCode: 200, data: [] }


const mockedGetStations = getStations as jest.MockedFunction<typeof getStations>;
const stations: Station[] = [{ id: "1", name: "Wadowice" }, { id: "2", name: "Na rynku w Barlinku" }, { id: "312", name: "Dom Rycha Peji" }, { id: "44124", name: "W Szczecinie na młynie" }];
const stationsResponse = { isError: false, responseCode: 200, data: stations }
mockedGetStations.mockResolvedValue(stationsResponse);


it("No rented bikes should show a message", async () => {
    mockedGetRentedBikes.mockResolvedValue(emptyResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <RentedBikesList />
        );
    });

    expect(renderResult.getByText('No bikes rented')).toBeDefined();
})



it("Bikes ids exisit on list", async () => {
    mockedGetRentedBikes.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <RentedBikesList />
        );
    });

    bikes.forEach(bike => {
        expect(renderResult.getByText(bike.rentalStationName, { exact: false })).toBeDefined();
        expect(renderResult.getByText(bike.rentalTimestamp.toLocaleString(), { exact: false })).toBeDefined();
    });
})


it("There should be a button to return a bike", async () => {
    mockedGetRentedBikes.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <RentedBikesList />
        );
    });

    const list = renderResult.getByRole('list');

    bikes.forEach((bike, index) => {
        const listElement = list.children[index];
        expect(listElement.innerHTML.indexOf('button')).not.toEqual(-1);
    });
})


it("Show popup after clicking to return bike", async () => {
    mockedGetRentedBikes.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <RentedBikesList />
        );
    });

    const list = renderResult.getByRole('list');
    const buttons = renderResult.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    await act(async () => {
        fireEvent.click(buttons[0]);
    });

    expect(renderResult.getByRole('dialog')).toBeDefined();

})

it("Returning a bike show success message", async () => {
    mockedGetRentedBikes.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <RentedBikesList />
        );
    });

    const buttons = renderResult.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    await act(async () => {
        fireEvent.click(buttons[0]);
    });
    expect(renderResult.getByRole('dialog')).toBeDefined();

    const returnButtons = renderResult.getAllByText('Return');
    expect(returnButtons.length).toBeGreaterThan(0);
    await act(async () => {
        fireEvent.click(returnButtons[0]);
    });
    expect(renderResult.getByText('Bike returned')).toBeDefined();
})