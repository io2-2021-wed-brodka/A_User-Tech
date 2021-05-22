import { act, cleanup, fireEvent, RenderResult } from '@testing-library/react';
import React from 'react';
import 'regenerator-runtime/runtime';
import { getRentedBikes } from '../../../api/bikes/getRentedBikes';
import { getActiveStations } from '../../../api/stations/getActiveStations';
import { RentedBike } from '../../../models/bike';
import { Station } from '../../../models/station';
import MainPage from '../../../pages/mainPage/MainPage';
import { render } from '../../test-utils';
import { reportMalfunction } from "../../../api/malfunctions/reportMalfunction";

afterEach(cleanup);

jest.mock('../../../api/bikes/rentedBikes');
jest.mock('../../../api/stations/getActiveStations');
jest.mock('../../../api/malfunctions/reportMalfunction');


const mockedGetRentedBikes = getRentedBikes as jest.MockedFunction<typeof getRentedBikes>;
const bikes: RentedBike[] = [
    { id: "2137", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice" } },
    { id: "2138", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice" } },
    { id: "SPEED", status: "", user: { id: "1", name: "Artur" }, station: { id: "1", name: "Wadowice" } },
];
const fullResponse = { isError: false, responseCode: 200, data: { bikes } }
const emptyResponse = { isError: false, responseCode: 200, data: { bikes: [] } }


const mockedGetStations = getActiveStations as jest.MockedFunction<typeof getActiveStations>;
const stations: Station[] = [{ id: "1", name: "Wadowice" }, { id: "2", name: "Na rynku w Barlinku" }, {
    id: "312",
    name: "Dom Rycha Peji"
}, { id: "44124", name: "W Szczecinie na młynie" }];
const stationsResponse = { isError: false, responseCode: 200, data: { stations } }
mockedGetStations.mockResolvedValue(stationsResponse);

const mockedReportMalfunction = reportMalfunction as jest.MockedFunction<typeof reportMalfunction>;
const reportMalfunctionResponse = {
    isError: false,
    responseCode: 201,
    data: {
        id: '2137',
        bikeId: '2137',
        description: 'Odpadły oba pedały',
        reportingUserId: '1'
    }
};
mockedReportMalfunction.mockResolvedValue(reportMalfunctionResponse);


it("No rented bikes should show a message", async () => {
    mockedGetRentedBikes.mockResolvedValue(emptyResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <MainPage />
        );
    });

    expect(renderResult.getByText('No bikes rented')).toBeDefined();
})


it("Bikes ids exisit on list", async () => {
    mockedGetRentedBikes.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <MainPage />
        );
    });

    bikes.forEach(bike => {
        expect(renderResult.getByText(bike.id, { exact: false })).toBeDefined();
    });
})


it("There should be a button to return a bike", async () => {
    mockedGetRentedBikes.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <MainPage />
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
            <MainPage />
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
            <MainPage />
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

it("Reporting malfunction should show success message", async () => {
    mockedGetRentedBikes.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<MainPage />);
    });

    const buttons = renderResult.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(1);
    await act(async () => {
        fireEvent.click(buttons[1]);
    });
    const malfunctionDialog = renderResult.getByRole('dialog');
    expect(malfunctionDialog).toBeDefined();

    const reportButton = renderResult.getByText('Report');
    expect(reportButton).toBeDefined();
    await act(async () => {
        fireEvent.click(reportButton);
    });
    expect(renderResult.getByText('Malfunction reported')).toBeDefined();
})
