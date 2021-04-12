import { Dialog, DialogContent, DialogTitle, IconButton, ListItemSecondaryAction, makeStyles, Typography } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import React, { useEffect, useState } from "react";
import { getRentedBikes } from "../../api/bikes/rentedBikes";
import Transition from "../../layout/Transition";
import { Bike } from "../../models/bike";
import ReturnBikeDialog from "../ReturnBikeDialog";
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';

const useStyles = makeStyles({
    list: {
    },
    typography: {
    }
});

const RentedBikesList = () => {
    const classes = useStyles();
    const [rentedBikes, setRentedBikes] = useState<Bike[]>([]);
    const [openSlidingWindow, setOpenSlidingWindow] = useState<boolean>(false);
    const [returnBikeId, setReturnBikeId] = useState<string>("");

    useEffect(() => {
        getRentedBikes().then(res => {
            setRentedBikes(res.data || []);
        });
    }, [])

    const handleCloseWindow = () => {
        setOpenSlidingWindow(false);
        setReturnBikeId("");
    };
    const handleOpenWindow = (bikeId: string) => {
        setOpenSlidingWindow(true);
        setReturnBikeId(bikeId);
    };


    return (
        rentedBikes.length > 0 ?
            <>
                <List className={classes.list}>
                    {
                        rentedBikes.map(bike => {
                            return (
                                <ListItem key={bike.id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <DirectionsBikeIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={bike.rentalTimestamp.toLocaleString()}
                                        secondary={"From: " + bike.rentalStationName}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleOpenWindow(bike.id)}
                                        >
                                            <SubdirectoryArrowLeftIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })
                    }
                </List>
                <Dialog
                    open={openSlidingWindow}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseWindow}
                    aria-labelledby="return-dialog-slide-title"
                    aria-describedby="return-dialog-slide-description"
                >
                    <DialogTitle id="return-dialog-slide-title">
                        {"Choose return station for bike: " + returnBikeId}
                    </DialogTitle>
                    <DialogContent>
                        <ReturnBikeDialog
                            bikeId={returnBikeId}
                            closeDialog={handleCloseWindow}
                        />
                    </DialogContent>
                </Dialog>
            </>
            :
            <Typography className={classes.typography}>No bikes rented</Typography>
    )
}

export default RentedBikesList;
