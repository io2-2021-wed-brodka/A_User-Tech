import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    toolbar: {
    },
    logo: { textDecoration: 'none', color: "white" },
    loginButton: {
        backgroundColor: "white",
        marginLeft: "auto",
        '&:hover': {
            backgroundColor: "#DAE0E2"
        },
    },
    logoutButton: {
        backgroundColor: "white",
        marginLeft: "1em",
        '&:hover': {
            backgroundColor: "#DAE0E2"
        },
    },
    right: {
        marginLeft: "auto",
    }

}));


export interface TopbarProps {
    logged: boolean;
    setToken: (newToken: string | undefined) => void;
}

const Topbar = (props: TopbarProps) => {
    const classes = useStyles();
    const history = useHistory();
    const [userName, setUserName] = useState<string>();
    useEffect(() => {
        setUserName(localStorage.getItem('userName') || 'Anon');
    }, [props.logged])


    const handleLoginClick = () => {
        history.push("login");
    }

    const handleLogoutClick = () => {
        props.setToken(undefined);
        history.push("/");
    }

    const handleLogoClick = () => {
        history.push("/");
    }

    return (
        <div>
            <AppBar>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" display={"inline"} >
                        <Link to={"/"} className={classes.logo} >
                            Bikes
                        </Link>
                    </Typography>
                    {props.logged ?
                        <>
                            <Typography className={classes.right}>Witaj {userName}</Typography>
                            <Button className={classes.logoutButton} onClick={handleLogoutClick}>Log out</Button>
                        </>
                        :
                        <Button className={classes.loginButton} onClick={handleLoginClick}>Log in</Button>
                    }

                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    )
}

export default Topbar;