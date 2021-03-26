import { act, cleanup, RenderResult } from '@testing-library/react';
import React from 'react';
import 'regenerator-runtime/runtime';
import { getRentedBikes } from '../../../api/bikes/rentedBikes';
import { Bike } from '../../../models/bike';
import RentedBikesList from '../../../pages/mainPage/RentedBikesList';
import { render } from '../../test-utils';

afterEach(cleanup);

jest.mock('../../../api/bikes/rentedBikes');


const mockedGetRentedBikes = getRentedBikes as jest.MockedFunction<typeof getRentedBikes>;
const bikes: Bike[] = [
    { id: "2137", rentalStationName: "Stacja Główna", rentalTimestamp: new Date(2011, 11, 11, 11, 11) },
    { id: "2138", rentalStationName: "Stacja Poboczna", rentalTimestamp: new Date(2012, 12, 12, 12, 12) },
    { id: "SPEED", rentalStationName: "Warszawa Zachodnia", rentalTimestamp: new Date(2012, 12, 15, 15, 15) },
];
const fullResponse = { isError: false, responseCode: 200, data: bikes }
const emptyResponse = { isError: false, responseCode: 200, data: [] }


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
