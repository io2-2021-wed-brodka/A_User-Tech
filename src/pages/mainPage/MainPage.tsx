import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { getRentedBikes } from '../../api/bikes/rentedBikes';
import { getStations } from '../../api/stations/getStations';
import { RentedBike } from '../../models/bike';
import { StationWithBikes } from '../../models/station';
import RentedBikesList from './RentedBikesList';
import StationsList from './rentPart/StationsList';
import React from 'react';

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
    const { enqueueSnackbar } = useSnackbar();

    const [rentedBikes, setRentedBikes] = useState<RentedBike[]>([]);
    const [stations, setStations] = useState<StationWithBikes[]>([]);

    useEffect(() => {
        fetchRentedBikes();
        fetchStations();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const addRentedBike = (bike: RentedBike) => {
        setRentedBikes(prev => [...prev, bike]);
        fetchRentedBikes();
    }

    const fetchRentedBikes = () => {
        getRentedBikes().then(res => {
            if (res.isError) {
                enqueueSnackbar("Could not get rented bikes", { variant: "error" });
            }
            else {
                setRentedBikes(res.data || []);
            }
        });
    }
    const fetchStations = () => {
        getStations().then(res => {
            if (res.isError) {
                enqueueSnackbar("Could not retrive stations", { variant: "error" });
                return;
            }
            setStations((res.data || []).map(s => {
                return {
                    ...s,
                    bikes: [],
                };
            }
            ));
        });
    }

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
                    <StationsList setStations={setStations} stations={stations} addRentedBike={addRentedBike} />
                </div>
            </div>
        </>
    )
}

export default MainPage;