import {
    Avatar, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List, ListItem, ListItemAvatar,
    ListItemSecondaryAction, ListItemText,
    makeStyles, Typography
} from "@material-ui/core";
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { getBikesFromStation } from "../../../api/bikes/getBikesFromStation";
import { rentBike } from "../../../api/bikes/rentBike";
import Transition from "../../../layout/Transition";
import { UnrentedBike } from "../../../models/unrentedBike";
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
    stationId: string
}

const StationBikesList = (props: StationBikesListProps) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [bikes, setBikes] = useState<UnrentedBike[]>([]);
    const [openSlidingWindow, setOpenSlidingWindow] = useState<boolean>(false);
    const [rentBikeId, setRentBikeId] = useState<string>('');

    useEffect(() => {

        if (props.stationId === undefined) {
            enqueueSnackbar("Could not retrive bikes", { variant: "error" });
            return;
        }
        getBikesFromStation(props.stationId).then(res => {

            if (res.isError) {
                enqueueSnackbar("Could not retrive bikes", { variant: "error" });
                return;
            }
            setBikes(res.data || []);
        });
    }, [props.stationId, enqueueSnackbar]);

    const rentBikeClickHandle = (id: string) => {
        setRentBikeId(id);
        setOpenSlidingWindow(true);
    }

    const handleCloseWindow = () => setOpenSlidingWindow(false);

    const rentBikeCall = () => {
        let tmpBike = rentBikeId;

        if (tmpBike.length < 1) {
            enqueueSnackbar("Could not rent this bike", { variant: "error" });
            return;
        }

        rentBike(tmpBike).then(res => {
            if (res.isError) {
                enqueueSnackbar("Something went wrong", { variant: "error" });
            }
            else {
                enqueueSnackbar("Bike rented", { variant: "success" });
            }
        });

        setOpenSlidingWindow(false);
        setRentBikeId('');
    }

    return (
        bikes.length > 0 ?
            <>
                <Typography className={classes.typography}>Available bikes:</Typography>
                <List className={classes.list}>
                    {
                        bikes.map(bike => {
                            return (<ListItem key={bike.id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <DirectionsBikeIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={bike.id} />
                                <ListItemSecondaryAction>
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
                <Dialog
                    open={openSlidingWindow}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseWindow}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Rent this bike?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Do you want to rent bike {rentBikeId} ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseWindow} color="primary">
                            No
                        </Button>
                        <Button onClick={rentBikeCall} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

            </>
            :
            <Typography className={classes.typography}>No bikes available</Typography>
    )
};


export default StationBikesList;
