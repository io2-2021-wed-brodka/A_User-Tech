import React from 'react';
import { useScrollTrigger } from "@material-ui/core";
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom";
import Topbar from "./layout/Topbar";
import MainPage from "./pages/mainPage/MainPage";
import RentBikePage from "./pages/rentPage/RentBikePage";

const Pages = () => {

    return (
        <BrowserRouter>            
            <Topbar />
            <Switch>
                <Route exact path="/" component={() => <MainPage />} />
                <Route exact path="/rent" component={() => <RentBikePage />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Pages;