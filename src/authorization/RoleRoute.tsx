import React from "react";
import { Route, RouteProps } from "react-router";
import { useHistory } from "react-router-dom";
import { RoleToInt } from "./authUtils";

export interface RoleRoutePros extends RouteProps {
    requiredRole?: string;
    actualRole?: string; // undefined = notLogged 
}

const RoleRoute = (props: RoleRoutePros) => {
    const history = useHistory();
    if (RoleToInt(props.actualRole) > RoleToInt(props.requiredRole)) {
        history.push('login');
    }
    return <Route {...props} />
}

export default RoleRoute;