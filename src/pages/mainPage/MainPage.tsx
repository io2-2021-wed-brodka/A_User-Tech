import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useSnackbar} from 'notistack';
import {useEffect, useState} from 'react';
import {getRentedBikes} from '../../api/bikes/rentedBikes';
import {getActiveStations} from '../../api/stations/getActiveStations';
import {RentedBike} from '../../models/bike';
import {StationWithBikes} from '../../models/station';
import RentedBikesList from './RentedBikesList';
import StationsList from './rentPart/StationsList';
import React from 'react';
import {returnRentedBike} from '../../api/bikes/returnBikes';
import {BikeStatus} from '../../models/bikeStatus';
import {reportMalfunction} from '../../api/malfunctions/reportMalfunction'

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
    const {enqueueSnackbar} = useSnackbar();

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
                enqueueSnackbar("Could not get rented bikes", {variant: "error"});
            } else {
                setRentedBikes(res.data?.bikes || []);
            }
        });
    }

    const fetchStations = () => {
        getActiveStations().then(res => {
            if (res.isError) {
                enqueueSnackbar("Could not retrive stations", {variant: "error"});
                return;
            }
            setStations((res.data?.stations || []).map(s => {
                    return {
                        ...s,
                        bikes: [],
                    };
                }
            ));
        });
    }

    const ReturnBike = (bikeId: string, stationId: string) => {
        if (bikeId.length < 1) {
            enqueueSnackbar("Could not return this bike", {variant: "error"});
            return;
        }

        returnRentedBike(bikeId, stationId).then(res => {
            if (res.isError) {
                enqueueSnackbar("Something went wrong", {variant: "error"});
            } else {
                enqueueSnackbar("Bike returned", {variant: "success"});
                setRentedBikes(prev => prev.filter(b => b.id !== bikeId));
                getRentedBikes().then(res => {
                    if (res.isError) {
                        enqueueSnackbar("Could not get rented bikes", {variant: "error"});
                    } else {
                        setRentedBikes(res.data?.bikes || []);
                    }
                });
                setStations(prev => prev.map(s => {
                    if (s.id !== stationId) return s;
                    const ns = {...s, bikes: [...s.bikes, {id: bikeId, status: BikeStatus.available}]};
                    return ns;
                }));
            }
        });
    }

    const ReportMalfunction = (bikeId: string, description: string) => {
        if (bikeId.length < 1) {
            enqueueSnackbar("Could not report malfunction: invalid bike id", {variant: "error"});
            return;
        }

        reportMalfunction(bikeId, description).then(response => {
            if (response.isError) {
                enqueueSnackbar(`Reporting malfunction failed: ${response.errorMessage}`, {variant: "error"});
            } else {
                enqueueSnackbar("Malfunction reported", {variant: "success"});
                setRentedBikes(prev => prev.filter(b => b.id !== bikeId));
            }
        });
    }

    return (
        <>
            <div className={classes.container}>
                <div>
                    <Typography variant='h5' className={classes.subheader}>
                        Rented bikes:
                    </Typography>
                    <RentedBikesList
                        setRentedBikes={setRentedBikes}
                        rentedBikes={rentedBikes}
                        ReturnBike={ReturnBike}
                        reportMalfunction={ReportMalfunction}
                    />
                    <Typography variant='h5' className={classes.subheader}>
                        Available stations:
                    </Typography>
                    <StationsList setStations={setStations} stations={stations} addRentedBike={addRentedBike}/>
                </div>
            </div>
        </>
    )
}

export default MainPage;