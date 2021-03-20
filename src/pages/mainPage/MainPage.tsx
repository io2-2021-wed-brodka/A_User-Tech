import { Box, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from "react-router-dom";
import RentBikePage from '../rentPage/RentBikePage';
import RentedBikesList from './RentedBikesList';

const useStyles = makeStyles({
    container: {         
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    paper: {
        padding: '1em',
        margin: '1em',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const MainPage = () => {
    let history = useHistory();
    const classes = useStyles();

    return (
        <>           
            <div className={classes.container}>
                <div>
                    <Paper className={classes.paper}>
                        <RentedBikesList />
                    </Paper>            
                    <RentBikePage/>
                </div>
            </div>             
        </>
    )
}

export default MainPage;