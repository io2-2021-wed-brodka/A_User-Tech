import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { getRentedBikes } from '../../api/bikes/getRentedBikes';
import { getActiveStations } from '../../api/stations/getActiveStations';
import { RentedBike } from '../../models/bike';
import { StationWithBikes } from '../../models/station';
import RentedBikesList from './RentedBikesList';
import StationsList from './rentPart/StationsList';
import React from 'react';
import { returnRentedBike } from '../../api/bikes/returnBikes';
import { BikeStatus } from '../../models/bikeStatus';
import { reportMalfunction } from '../../api/malfunctions/reportMalfunction'
import ReservedBikesList from './ReservedBikesList';
import { getReservedBikes } from '../../api/bikes/getReservedBikes';
import { ReservedBike } from '../../models/reseverdBike';

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
    const [reservedBikes, setReservedBikes] = useState<ReservedBike[]>([]);
    const [stations, setStations] = useState<StationWithBikes[]>([]);

    useEffect(() => {
        fetchRentedBikes();
        fetchReservedBikes();
        fetchStations();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const addRentedBike = (bike: RentedBike) => {
        setRentedBikes(prev => [...prev, bike]);
        const reservedBike = reservedBikes.find(b => b.id === bike.id);
        if (reservedBike) {
            setReservedBikes(prev => prev.filter(b => b.id !== reservedBike.id));
        }
        fetchRentedBikes();
    }

    const addReservedBike = (bike: ReservedBike) => {
        setReservedBikes(prev => [...prev, bike]);
        setStations(prev => prev.map(s => {
            if (s.id !== bike.station.id) return s;
            const copy = { ...s };
            copy.bikes = s.bikes.filter(b => b.id !== bike.id);
            return copy;
        }));
        fetchReservedBikes();
    }

    const removeReservedBike = (bikeId: string) => {
        setReservedBikes(prev => prev.filter(b => b.id !== bikeId));
        const bike = reservedBikes.find(b => b.id === bikeId);
        setStations(prev => prev.map(s => {
            if (s.id !== bike?.station.id) return s;
            const copy = { ...s };
            copy.bikes = [...s.bikes, { id: bike.id, status: "available" }];
            return copy;
        }));
        fetchReservedBikes();
    }

    const fetchRentedBikes = () => {
        getRentedBikes().then(res => {
            if (res.isError) {
                enqueueSnackbar("Could not get rented bikes", { variant: "error" });
            } else {
                setRentedBikes(res.data?.bikes || []);
            }
        });
    }

    const fetchReservedBikes = () => {
        getReservedBikes().then(res => {
            if (res.isError) {
                enqueueSnackbar("Could not get reserved bikes", { variant: "error" });
            } else {
                setReservedBikes(res.data?.bikes || []);
            }
        });
    }

    const fetchStations = () => {
        getActiveStations().then(res => {
            if (res.isError) {
                enqueueSnackbar("Could not retrive stations", { variant: "error" });
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
            enqueueSnackbar("Could not return this bike", { variant: "error" });
            return;
        }

        returnRentedBike(bikeId, stationId).then(res => {
            if (res.isError) {
                enqueueSnackbar("Something went wrong", { variant: "error" });
            } else {
                enqueueSnackbar("Bike returned", { variant: "success" });
                setRentedBikes(prev => prev.filter(b => b.id !== bikeId));
                getRentedBikes().then(res => {
                    if (res.isError) {
                        enqueueSnackbar("Could not get rented bikes", { variant: "error" });
                    } else {
                        setRentedBikes(res.data?.bikes || []);
                    }
                });
                setStations(prev => prev.map(s => {
                    if (s.id !== stationId) return s;
                    const ns = { ...s, bikes: [...s.bikes, { id: bikeId, status: BikeStatus.available }] };
                    return ns;
                }));
            }
        });
    }

    const ReportMalfunction = (bikeId: string, description: string) => {
        if (bikeId.length < 1) {
            enqueueSnackbar("Could not report malfunction: invalid bike id", { variant: "error" });
            return;
        }

        reportMalfunction(bikeId, description).then(response => {
            if (response.isError) {
                enqueueSnackbar(`Reporting malfunction failed: ${response.errorMessage}`, { variant: "error" });
            } else {
                enqueueSnackbar("Malfunction reported", { variant: "success" });
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
                        rentedBikes={rentedBikes}
                        ReturnBike={ReturnBike}
                        reportMalfunction={ReportMalfunction}
                    />
                    <ReservedBikesList
                        reservedBikes={reservedBikes} addRentedBike={addRentedBike} removeReservedBike={removeReservedBike}
                    />
                    <Typography variant='h5' className={classes.subheader}>
                        Available stations:
                    </Typography>
                    <StationsList setStations={setStations} stations={stations} addRentedBike={addRentedBike} addReservedBike={addReservedBike} />
                </div>
            </div>
        </>
    )
}

export default MainPage;