import {
    BrowserRouter,
    Route,
    Switch,

} from "react-router-dom";
import MainPage from "./pages/MainPage";

const Pages = () => {

    return (
        <BrowserRouter>

            <Switch>
                <Route exact path="/" component={() => <MainPage />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Pages;