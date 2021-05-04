import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { HasRole } from "./authUtils";

export interface RoleRoutePros extends RouteProps {
    requiredRole?: string;
    actualRole?: string | null; // undefined = notLogged 
}

const RoleRoute = (props: RoleRoutePros) => {
    if (!HasRole(props.actualRole, props.requiredRole)) {
        return <Redirect to={'login'} />
    }
    return <Route {...props} />
}

export default RoleRoute;