import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
const useStyles = makeStyles(theme => ({
    topBar: {
        width: '100%',
        backgroundColor: "#F87172",
        height: "3em",
        display: "flex",
        justifyContent: "space-between"
    },
    leftSide: {
        display: "flex",
        alignItems: "center"
    },
    loginDiv: {
        float: 'right',
        color: 'white',
        padding: '1em'
    },
    loginButton: {
        backgroundColor: "white",
        marginLeft: "1em",
        '&:hover': {
            backgroundColor: "#DAE0E2"
        }
    },
    appTitle: {
        margin: theme.spacing(1),
        color: "white"
    }


}));



const Topbar = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>            
                <Typography variant="h6">
                Bikes
                </Typography>                
            </Toolbar>
        </AppBar>
    )
}

export default Topbar;