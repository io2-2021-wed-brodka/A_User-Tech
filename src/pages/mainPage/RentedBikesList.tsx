import {
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
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import React, { useState } from "react";
import { RentedBike } from "../../models/rentedBike";
import ReturnBikeDialog from "../dialogs/ReturnBikeDialog";

const useStyles = makeStyles({
    list: {},
    typography: {}
});

export interface RentedBikesListProps {
    rentedBikes: RentedBike[];
    ReturnBike: (bikeId: string, stationId: string) => void;
}

const RentedBikesList = (props: RentedBikesListProps) => {
    const classes = useStyles();

    const [openSlidingWindow, setOpenSlidingWindow] = useState<boolean>(false);
    const [withMalfunction, setWithMalfunction] = useState<boolean>(false);
    const [returnBikeId, setReturnBikeId] = useState<string>("");


    const handleCloseWindow = () => {
        setOpenSlidingWindow(false);
        setReturnBikeId("");
    };
    const handleOpenWindow = (bikeId: string, withMalfunction = false) => {
        setWithMalfunction(withMalfunction);
        setOpenSlidingWindow(true);
        setReturnBikeId(bikeId);
    };

    const handleCloseDialog = () => {
        setOpenSlidingWindow(false);
        setReturnBikeId("");
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
                                        primary={bike.id}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            style={{ marginRight: 10 }}
                                            onClick={() => handleOpenWindow(bike.id)}
                                        >
                                            <SubdirectoryArrowLeftIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleOpenWindow(bike.id, true)}
                                        >
                                            <ReportProblemOutlinedIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })
                    }
                </List>
                <ReturnBikeDialog
                    bikeId={returnBikeId}
                    closeDialog={handleCloseWindow}
                    ReturnBike={props.ReturnBike}
                    open={openSlidingWindow}
                    handleCloseWindow={handleCloseDialog}
                    withMalfunction={withMalfunction}
                />

            </>
            :
            <Typography className={classes.typography}>No bikes rented</Typography>
    )
}

export default RentedBikesList;
