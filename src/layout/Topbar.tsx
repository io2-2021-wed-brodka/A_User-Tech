import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({

    loginButton: {
        backgroundColor: "white",
        marginLeft: "1em",
        '&:hover': {
            backgroundColor: "#DAE0E2"
        }
    },

}));


export interface TopbarProps {
    logged: boolean;
}

const Topbar = (props: TopbarProps) => {
    const classes = useStyles();
    const history = useHistory();
    const [userName, setUserName] = useState<string>();
    useEffect(() => {
        setUserName(localStorage.getItem('userName') || 'nie ma');
    }, [props.logged])


    const handleLoginClick = () => {
        history.push("login");
    }

    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6">
                        Bikes
                    </Typography>
                    {props.logged ?
                        <Typography>Witaj {userName}</Typography> //Log out in the future
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