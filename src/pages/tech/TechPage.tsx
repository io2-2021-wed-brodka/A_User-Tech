import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import TechStationsList from './TechStationsList';

const useStyles = makeStyles({
    container: {
        marginTop: '1em',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    box: {
        width: 'inherit',
        maxWidth: '450px'
    },
    subheader: {
        padding: '0.25em',
        paddingLeft: '0.5em',
    },
});

const TechPage = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.container}>
                <div className={classes.box}>
                    <Typography variant='h5' className={classes.subheader}>
                        All stations:
                    </Typography>
                    <TechStationsList />
                </div>
            </div>
        </>
    )
}

export default TechPage;