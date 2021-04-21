import React, { useEffect, useState } from "react";
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom";
import Topbar from "./layout/Topbar";
import LoginPage from "./pages/loggin/LoginPage";
import MainPage from "./pages/mainPage/MainPage";
import RegisterPage from "./pages/register/RegisterPage";

const Pages = () => {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('userName');
        if (token && userName) {
            setLogged(true);
        }
        else {
            setLogged(false);
        }
    }, [])

    const setToken = (newToken: string | undefined) => {
        if (newToken) {
            localStorage.setItem("token", newToken);
            setLogged(true);
        }
        else {
            localStorage.removeItem("token");
            setLogged(false);
        }
    };

    const setUserName = (userName: string) => {
        localStorage.setItem("userName", userName);
    };
    
    return (
        <BrowserRouter>
            <Topbar logged={logged} setToken={setToken} />
            <Switch>
                { !logged ?
                <>
                    <Route exact path="/register" component={() => <RegisterPage setToken={setToken} setUserName={setUserName}/>} />
                    <Route exact path="/login" component={() => <LoginPage setToken={setToken} setUserName={setUserName} />} />
                    <Route exact path="/" component={() => <LoginPage setToken={setToken} setUserName={setUserName} />} />
                </>
                :
                <>
                    <Route path="/" component={() => <MainPage />} />
                </>
                }
            </Switch>
        </BrowserRouter>
    )
}

export default Pages;