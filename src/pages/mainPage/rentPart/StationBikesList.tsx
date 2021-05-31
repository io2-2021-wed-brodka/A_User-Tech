import {
    Avatar, Button,
    IconButton,
    List, ListItem, ListItemAvatar,
    ListItemSecondaryAction, ListItemText,
    makeStyles, Typography
} from "@material-ui/core";
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { getActiveBikesFromStation } from "../../../api/bikes/getBikesFromStation";
import { rentBike } from "../../../api/bikes/rentBike";
import { reserveBike } from "../../../api/bikes/reserveBike";
import { RentedBike } from "../../../models/rentedBike";
import { ReservedBike } from "../../../models/reseverdBike";
import { StationWithBikes } from "../../../models/station";
import RentBikeDialog from "./RentBikeDialog";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
const useStyles = makeStyles({
    paper: {
        padding: '1em',
        margin: '1em',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
    },
    typography: {
    }
});

interface StationBikesListProps {
    station: StationWithBikes;
    setStations: React.Dispatch<React.SetStateAction<StationWithBikes[]>>,
    addRentedBike: (bike: RentedBike) => void;
    addReservedBike: (bike: ReservedBike) => void;
}

const StationBikesList = (props: StationBikesListProps) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [openSlidingWindow, setOpenSlidingWindow] = useState<boolean>(false);
    const [rentBikeId, setRentBikeId] = useState<string>('');

    useEffect(() => {
        fetchBikes();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchBikes = () => {
        getActiveBikesFromStation(props.station.id).then(res => {

            if (res.isError) {
                enqueueSnackbar("Could not retrive bikes", { variant: "error" });
                return;
            }
            props.setStations(prev => prev.map(s => {
                if (s.id !== props.station.id) return s;
                const ns = { ...s };
                ns.bikes = res.data?.bikes || [];
                return ns;
            }));
        });
    }


    const rentBikeClickHandle = (id: string) => {
        setRentBikeId(id);
        setOpenSlidingWindow(true);
    }

    const reserveBikeClickHandle = (id: string) => {
        reserveBike(id).then(res => {
            if (res.isError) {
                enqueueSnackbar(`Failed to reserve bike: ${res.errorMessage}`, { variant: "error" });
            }
            else {
                const data = res.data;
                if (data) {
                    props.addReservedBike(data);
                }
            }
        })
    }

    const handleCloseWindow = () => setOpenSlidingWindow(false);

    const rentBikeCall = () => {
        let tmpBikeId = rentBikeId;

        if (tmpBikeId.length < 1) {
            enqueueSnackbar("Could not rent this bike", { variant: "error" });
            return;
        }

        rentBike(tmpBikeId).then(res => {
            if (res.isError) {
                enqueueSnackbar(`Failed to rent bike: ${res.errorMessage}`, { variant: "error" });
            }
            else {
                enqueueSnackbar("Bike rented", { variant: "success" });
                props.addRentedBike({ id: tmpBikeId, user: { id: "", name: "" }, status: "", station: { id: "1", name: "", activeBikesCount: 0 } })
                props.setStations(prev => prev.map(s => {
                    if (s.id !== props.station.id) return s;
                    const ns = { ...s };
                    ns.bikes = ns.bikes.filter(b => b.id !== tmpBikeId);
                    ns.activeBikesCount--;
                    return ns;
                }));
                getActiveBikesFromStation(props.station.id).then(res => {

                    if (res.isError) {
                        enqueueSnackbar("Could not retrive bikes", { variant: "error" });
                        return;
                    }
                    props.setStations(prev => prev.map(s => {
                        if (s.id !== props.station.id) return s;
                        const ns = { ...s };
                        ns.bikes = res.data?.bikes || [];
                        return ns;
                    }));
                });
            }
        });

        setOpenSlidingWindow(false);
        setRentBikeId('');
    }

    return (
        props.station.bikes.length > 0 ?
            <>
                <Typography className={classes.typography}>Available bikes:</Typography>
                <List className={classes.list}>
                    {
                        props.station.bikes.map(bike => {
                            return (<ListItem key={bike.id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <DirectionsBikeIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={bike.id} />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="reserve"
                                        style={{ marginRight: 10 }}
                                        onClick={() => reserveBikeClickHandle(bike.id)}
                                    >
                                        <BookmarkBorderIcon />
                                    </IconButton>
                                    <Button size="small" color="primary"
                                        onClick={() => rentBikeClickHandle(bike.id)}>
                                        Rent
                                    </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                            );
                        })
                    }
                </List>
                <RentBikeDialog bikeId={rentBikeId} open={openSlidingWindow} onNoClick={handleCloseWindow} onYesClick={rentBikeCall} />
            </>
            :
            <Typography className={classes.typography}>No bikes available</Typography>
    )
};


export default StationBikesList;
