import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { RentedBike } from '../../models/bike';
import { StationWithBikes } from '../../models/station';
import RentedBikesList from './RentedBikesList';
import StationsList from './rentPart/StationsList';

const useStyles = makeStyles({
    container: {
        marginTop: '1em',
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
    box: {
        margin: '1em',
    },
    subheader: {
        padding: '0.25em',
        paddingLeft: '0.5em',
    },
});

const MainPage = () => {
    const classes = useStyles();

    const [rentedBikes, setRentedBikes] = useState<RentedBike[]>([]);
    const [stations, setStations] = useState<StationWithBikes[]>([]);

    return (
        <>
            <div className={classes.container}>
                <div>
                    <Typography variant='h5' className={classes.subheader}>
                        Rented bikes:
                    </Typography>
                    <RentedBikesList setRentedBikes={setRentedBikes} rentedBikes={rentedBikes} />
                    <Typography variant='h5' className={classes.subheader}>
                        Available stations:
                    </Typography>
                    <StationsList setStations={setStations} stations={stations} />
                </div>
            </div>
        </>
    )
}

export default MainPage;