import React, { useEffect, useState } from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import ListItemText from '@material-ui/core/ListItemText';
import { getRentedBikes } from "../../api/bikes/rentedBikes";
import { Bike } from "../../models/bike";
import Avatar from '@material-ui/core/Avatar';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import { IconButton, ListItemSecondaryAction, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    list: {
    },
    typography: {
    }
});

const RentedBikesList = () => {
    const classes = useStyles();
    const [rentedBikes, setRentedBikes] = useState<Bike[]>([])
    useEffect(() => {
        getRentedBikes().then(bikes => {
            setRentedBikes(bikes);
        });
    }, [])

    return (
        rentedBikes.length > 0 ?
            <>
                <Typography className={classes.typography}>Rented bikes:</Typography>
                <List className={classes.list}>
                    {
                        rentedBikes.map(bike => {
                            return (
                                <ListItem>
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
                                        <IconButton edge="end" aria-label="delete">
                                            <AccessibleForwardIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </>
            :
            <Typography className={classes.typography}>No bikes rented</Typography>

    )
}

export default RentedBikesList;
