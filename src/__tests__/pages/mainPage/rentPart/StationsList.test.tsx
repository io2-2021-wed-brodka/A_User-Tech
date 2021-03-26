import { act, cleanup, fireEvent } from '@testing-library/react';
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
const mockedGetBikesFromStation = getBikesFromStation as jest.MockedFunction<typeof getBikesFromStation>;

it("Station card unfolds on click", async () => {

    const stations: Station[] = [{ id: "1", name: "Wadowice" }, { id: "2", name: "Na rynku w Barlinku" }, { id: "312", name: "Dom Rycha Peji" }, { id: "44124", name: "W Szczecinie na młynie" }];
    const resp = { isError: false, responseCode: 200, data: stations }
    mockedGetStations.mockResolvedValue(resp);

    const bikes: UnrentedBike[] = [{ id: "2137" }, { id: "2138" }];
    const resp2 = { isError: false, responseCode: 200, data: bikes }
    mockedGetBikesFromStation.mockResolvedValue(resp2);

    let elo: any = {};
    await act(async () => {
        elo = render(
            <StationsList />
        );

    });
    expect(elo.getByText('Wadowice')).toBeDefined();
    expect(elo.getByText('Na rynku w Barlinku')).toBeDefined();
    expect(elo.getByText('Dom Rycha Peji')).toBeDefined();
    expect(elo.getByText('W Szczecinie na młynie')).toBeDefined();

    expect(elo.queryByText('2137')).toBeNull();
    expect(elo.queryByText('2138')).toBeNull();

    await act(async () => {
        fireEvent.click(elo.getByText('Wadowice'));
    })

    expect(elo.getByText('2137')).toBeDefined();
    expect(elo.getByText('2138')).toBeDefined();

})