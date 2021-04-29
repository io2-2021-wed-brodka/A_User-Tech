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
import TechPage from "./pages/tech/TechPage";



const Pages = () => {
    const [user, setUser] = useState<AppUser | undefined>({
        token: getToken(),
        userName: getUserName(),
        role: getRole(),
    });

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
        else {
            setUser(undefined);
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
                <RoleRoute requiredRole={'user'} actualRole={user?.role} exact path="/" component={() => <MainPage />} />
                <RoleRoute requiredRole={'tech'} actualRole={user?.role} exact path="/techPage" component={() => <TechPage />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Pages;