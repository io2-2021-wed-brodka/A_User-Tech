import {
    Button,
    IconButton,
    ListItemSecondaryAction,
    makeStyles,
    Typography
} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { cancelBikeReservation } from "../../api/bikes/cancelBikeReservation";
import { getReservedBikes } from "../../api/bikes/getReservedBikes";
import { rentBike } from "../../api/bikes/rentBike";
import { RentedBike } from "../../models/rentedBike";
import { ReservedBike } from "../../models/reseverdBike";
import RentBikeDialog from "./rentPart/RentBikeDialog";

const useStyles = makeStyles({
    list: {},
    typography: {},
    subheader: {
        padding: '0.25em',
        paddingLeft: '0.5em',
    },
});

export interface ReservedBikesListProps {
    reservedBikes: ReservedBike[];
    removeReservedBike: (bikeId: string) => void;
    addRentedBike: (bike: RentedBike) => void;
}

const ReservedBikesList = (props: ReservedBikesListProps) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [rentBikeId, setRentBikeId] = useState<string>('');
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [timers, setTimers] = useState<string[]>([]);
    const [callbackTimer, setCallbackTimer] = useState<number>();

    useEffect(() => {
        setTimers(new Array<string>(props.reservedBikes.length));
        callbackTimer && window.clearInterval(callbackTimer);
        let timeout: number = -1;
        if (props.reservedBikes.length !== 0) {
            refreshTimers();
            timeout = window.setInterval(refreshTimers, 1000);
            setCallbackTimer(timeout);

        }
        return () => {
            if (timeout !== -1) {
                window.clearInterval(timeout);
            }
        };
    }, [props.reservedBikes]) // eslint-disable-line react-hooks/exhaustive-deps



    const refreshTimers = () => {
        const newTimers: string[] = new Array<string>(props.reservedBikes.length);
        const now = new Date();
        const outOfTimeBikesIndexes: number[] = [];
        for (let index = 0; index < props.reservedBikes.length; index++) {
            const bike = props.reservedBikes[index];
            const reservedTill = new Date(bike.reservedTill);
            const timeLeftMs = reservedTill.getTime() - now.getTime();
            if (timeLeftMs < 0) {
                newTimers[index] = "--:--"
                outOfTimeBikesIndexes.push(index);
            }
            else {
                const minutes = Math.floor(timeLeftMs / 1000 / 60);
                const seconds = Math.floor((timeLeftMs - minutes * 60 * 1000) / 1000);
                const minutesStr = minutes < 10 ? "0" + minutes : minutes;
                const secondsStr = seconds < 10 ? "0" + seconds : seconds;

                newTimers[index] = `${minutesStr}:${secondsStr}`;
            }
        }
        if (outOfTimeBikesIndexes.length > 0) {
            removeOutOfTime(outOfTimeBikesIndexes);
        }
        setTimers(newTimers);
    }

    const removeOutOfTime = async (outOfTimeBikesIndexes: number[]) => {
        const response = await getReservedBikes();
        const bikes = response.data?.bikes;
        if (bikes) {
            for (let index = 0; index < outOfTimeBikesIndexes.length; index++) {
                const i = outOfTimeBikesIndexes[index];
                if (!bikes.some(b => b.id === props.reservedBikes[i].id)) {
                    props.removeReservedBike(props.reservedBikes[i].id);
                    break;
                }
            }
        }


    };


    const rentBikeClickHandle = (id: string) => {
        setRentBikeId(id);
        setOpenDialog(true);
    }

    const cancelReservationClickHandle = (id: string) => {
        cancelBikeReservation(id).then(res => {
            if (res.isError) {
                enqueueSnackbar(`Failed to rent cancel reservation: ${res.errorMessage}`, { variant: "error" });
            }
            else {
                props.removeReservedBike(id);
            }
        })
    }

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
            }
        });

        setOpenDialog(false);
        setRentBikeId('');
    }

    const handleCloseDialog = () => setOpenDialog(false);
    return (
        props.reservedBikes.length > 0 ?
            <>
                <Typography variant='h5' className={classes.subheader}>
                    Reserved bikes:
                    </Typography>
                <List className={classes.list}>
                    {
                        props.reservedBikes.map((bike, index) => {
                            return (
                                <ListItem key={bike.id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <DirectionsBikeIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={bike.id + " on " + bike.station.name} secondary={timers[index]}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            style={{ marginRight: 10 }}
                                            onClick={() => cancelReservationClickHandle(bike.id)}
                                        >
                                            <BookmarkIcon />
                                        </IconButton>
                                        <Button size="small" color="primary"
                                            onClick={() => rentBikeClickHandle(bike.id)}>
                                            Rent
                                    </Button>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })
                    }
                </List>
                <RentBikeDialog onNoClick={handleCloseDialog} bikeId={rentBikeId} open={openDialog} onYesClick={rentBikeCall} />
            </>
            :
            <></>
    )
}

export default ReservedBikesList;
