import 'regenerator-runtime/runtime'
import { cleanup, render, act } from '@testing-library/react';
import React from 'react';
import * as EEEEE from '../../../../api/stations/getStations';
import StationsList from '../../../../pages/mainPage/rentPart/StationsList';
import { ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import mainTheme from '../../../../layout/mainTheme';

afterEach(cleanup);

jest.mock('../../../../api/stations/getStations');


const mockMyFunction = EEEEE.getStations as jest.MockedFunction<typeof EEEEE.getStations>;

it("Station card unfolds on click", async () => {

    const stations = [{ id: "1", name: "Wadowice" }, { id: "2", name: "Na rynku w Barlinku" }, { id: "312", name: "Dom Rycha Peji" }, { id: "44124", name: "W Szczecinie na młynie" }];
    const resp = { isError: false, responseCode: 200, data: stations }

    mockMyFunction.mockResolvedValue(resp);
    const wrapper = ({ children }: any) => (
        <ThemeProvider theme={mainTheme}>
            <SnackbarProvider maxSnack={3} >
                {children}
            </SnackbarProvider  >
        </ThemeProvider >
    )
    await act(async () => {
        const { queryByLabelText } = render(
            <StationsList />, { wrapper }
        );
    });

})