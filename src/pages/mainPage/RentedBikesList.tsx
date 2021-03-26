import { IconButton, ListItemSecondaryAction, makeStyles, Typography } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import React, { useEffect, useState } from "react";
import { getRentedBikes } from "../../api/bikes/rentedBikes";
import { Bike } from "../../models/bike";

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
        getRentedBikes().then(res => {
            setRentedBikes(res.data || []);
        });
    }, [])

    return (
        rentedBikes.length > 0 ?
            <>
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
