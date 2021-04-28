import React, { useEffect, useState } from "react";
import {
    BrowserRouter,

    Switch
} from "react-router-dom";
import { getRole, getToken, getUserName, setRole, setToken, setUserName } from "./authorization/authUtils";
import RoleRoute from "./authorization/RoleRoute";
import Topbar from "./layout/Topbar";
import { AppUser } from "./models/appUser";
import LoginPage from "./pages/loggin/LoginPage";
import MainPage from "./pages/mainPage/MainPage";
import RegisterPage from "./pages/register/RegisterPage";



const Pages = () => {
    const [user, setUser] = useState<AppUser>();

    useEffect(() => {
        const token = getToken();
        const userName = getUserName();
        const role = getRole();
        if (token && userName && role) {
            setUser({
                role,
                token,
                userName,
            })
        }

    }, [])

    useEffect(() => {
        setToken(user?.token);
        setUserName(user?.userName);
        setRole(user?.role);
    }, [user])

    return (
        <BrowserRouter>
            <Topbar user={user} setUser={setUser} />
            <Switch>
                <RoleRoute exact path="/register" component={() => <RegisterPage />} />
                <RoleRoute exact path="/login" component={() => <LoginPage setUser={setUser} />} />
                <RoleRoute exact path="/" component={() => <MainPage />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Pages;