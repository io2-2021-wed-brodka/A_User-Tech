import { ThemeProvider } from '@material-ui/core'
import { render, RenderOptions } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'
import React, { ReactElement } from 'react'
import mainTheme from '../layout/mainTheme'

const AllTheProviders = ({ children }: any) => {
    return (
        <ThemeProvider theme={mainTheme}>
            <SnackbarProvider maxSnack={3} >
                {children}
            </SnackbarProvider  >
        </ThemeProvider >
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllTheProviders, ...options })


export * from '@testing-library/react'
export { customRender as render }

