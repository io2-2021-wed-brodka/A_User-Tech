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
        <div className={classes.topBar}>
            <div className={classes.leftSide}>



                <h1 className={classes.appTitle}>Bikes</h1>
            </div>
            <div className={classes.loginDiv}>
            </div>

        </div>
    )
}

export default Topbar;