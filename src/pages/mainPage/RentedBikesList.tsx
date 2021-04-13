import { Dialog, DialogContent, DialogTitle, IconButton, ListItemSecondaryAction, makeStyles, Typography } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import React, { useState } from "react";
import Transition from "../../layout/Transition";
import { RentedBike } from "../../models/bike";
import ReturnBikeDialog from "../ReturnBikeDialog";

const useStyles = makeStyles({
    list: {
    },
    typography: {
    }
});

export interface RentedBikesListProps {
    rentedBikes: RentedBike[];
    setRentedBikes: React.Dispatch<React.SetStateAction<RentedBike[]>>;
    ReturnBike: (bikeId: string, stationId: string) => void;
}

const RentedBikesList = (props: RentedBikesListProps) => {
    const classes = useStyles();
    const [openSlidingWindow, setOpenSlidingWindow] = useState<boolean>(false);
    const [returnBikeId, setReturnBikeId] = useState<string>("");

    const handleCloseWindow = () => {
        setOpenSlidingWindow(false);
        setReturnBikeId("");
    };
    const handleOpenWindow = (bikeId: string) => {
        setOpenSlidingWindow(true);
        setReturnBikeId(bikeId);
    };


    return (
        props.rentedBikes.length > 0 ?
            <>
                <List className={classes.list}>
                    {
                        props.rentedBikes.map(bike => {
                            return (
                                <ListItem key={bike.id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <DirectionsBikeIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        secondary={bike.id}
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
                            ReturnBike={props.ReturnBike}
                        />
                    </DialogContent>
                </Dialog>
            </>
            :
            <Typography className={classes.typography}>No bikes rented</Typography>
    )
}

export default RentedBikesList;
