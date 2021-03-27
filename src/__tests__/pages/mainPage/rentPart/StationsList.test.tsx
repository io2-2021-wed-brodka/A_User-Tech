import { act, cleanup, fireEvent, RenderResult, waitFor } from '@testing-library/react';
import React from 'react';
import 'regenerator-runtime/runtime';
import { getBikesFromStation } from '../../../../api/bikes/getBikesFromStation';
import { getStations } from '../../../../api/stations/getStations';
import { Station } from '../../../../models/station';
import { UnrentedBike } from '../../../../models/unrentedBike';
import StationsList from '../../../../pages/mainPage/rentPart/StationsList';
import { render } from '../../../test-utils';

afterEach(cleanup);

jest.mock('../../../../api/stations/getStations');
jest.mock('../../../../api/bikes/getBikesFromStation');


const mockedGetStations = getStations as jest.MockedFunction<typeof getStations>;
const stations: Station[] = [{ id: "1", name: "Wadowice" }, { id: "2", name: "Na rynku w Barlinku" }, { id: "312", name: "Dom Rycha Peji" }, { id: "44124", name: "W Szczecinie na młynie" }];
const resp = { isError: false, responseCode: 200, data: stations }
mockedGetStations.mockResolvedValue(resp);

const mockedGetBikesFromStation = getBikesFromStation as jest.MockedFunction<typeof getBikesFromStation>;
const bikes: UnrentedBike[] = [{ id: "2137" }, { id: "2138" }];
const resp2 = { isError: false, responseCode: 200, data: bikes }
mockedGetBikesFromStation.mockResolvedValue(resp2);

it("Station card unfolds on click", async () => {
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <StationsList />
        );
    });

    stations.forEach(station => {
        expect(renderResult.getByText(station.name)).toBeDefined();
    });

    bikes.forEach(bike => {
        expect(renderResult.queryByText(bike.id)).toBeNull();
    });

    await act(async () => {
        fireEvent.click(renderResult.getByText('Wadowice'));
    })
    bikes.forEach(bike => {
        expect(renderResult.getByText(bike.id)).toBeDefined();
    });

    await act(async () => {
        fireEvent.click(renderResult.getByText('Wadowice'));
    })

    for (let index = 0; index < bikes.length; index++) {
        await waitFor(() => expect(renderResult.queryByText(bikes[index].id)).toBeNull());
    }
})

it("All stations have images", async () => {
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <StationsList />
        );
    });

    stations.forEach(station => {
        expect(renderResult.getByText(station.name)).toBeDefined();
    });

    const buttons = renderResult.getAllByRole('button');

    stations.forEach(station => {
        const button = buttons.find(button => {
            return button.innerHTML.indexOf(station.name) !== -1;
        });
        expect(button?.innerHTML.indexOf('image')).not.toEqual(-1);
    });
})
