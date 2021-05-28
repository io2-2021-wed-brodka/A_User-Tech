import {
    Dialog,
    DialogContent,
    DialogTitle,
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
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import React, {useState} from "react";
import Transition from "../../layout/Transition";
import {RentedBike} from "../../models/bike";
import ReturnBikeDialog from "../dialogs/ReturnBikeDialog";
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import ReportMalfunctionDialog from "../dialogs/ReportMalfunctionDialog";

const useStyles = makeStyles({
    list: {},
    typography: {}
});

export interface RentedBikesListProps {
    rentedBikes: RentedBike[];
    setRentedBikes: React.Dispatch<React.SetStateAction<RentedBike[]>>;
    ReturnBike: (bikeId: string, stationId: string) => void;
    reportMalfunction: (bikeId: string, description: string) => void;
}

const RentedBikesList = (props: RentedBikesListProps) => {
    const classes = useStyles();

    const [openSlidingWindow, setOpenSlidingWindow] = useState<boolean>(false);
    const [returnBikeId, setReturnBikeId] = useState<string>("");

    const [openMalfunctionDialog, setOpenMalfunctionDialog] = useState<boolean>(false);
    const [malfunctionBikeId, setMalfunctionBikeId] = useState<string>("");

    const handleCloseWindow = () => {
        setOpenSlidingWindow(false);
        setReturnBikeId("");
    };
    const handleOpenWindow = (bikeId: string) => {
        setOpenSlidingWindow(true);
        setReturnBikeId(bikeId);
    };

    const handleCloseMalfunctionDialog = () => {
        setOpenMalfunctionDialog(false);
        setMalfunctionBikeId("");
    };
    const handleOpenMalfunctionDialog = (bikeId: string) => {
        setOpenMalfunctionDialog(true);
        setMalfunctionBikeId(bikeId);
    };

    return (
        props.rentedBikes.length > 0 ?
            <>
                <List id="rented-bike-list" className={classes.list}>
                    {
                        props.rentedBikes.map(bike => {
                            return (
                                <ListItem key={bike.id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <DirectionsBikeIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText id="bike-id" secondary={bike.id}/>
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            id="bike-return-button"
                                            edge="end"
                                            aria-label="delete"
                                            style={{marginRight: 10}}
                                            onClick={() => handleOpenWindow(bike.id)}
                                        >
                                            <SubdirectoryArrowLeftIcon/>
                                        </IconButton>
                                        <IconButton
                                            id="report-malfunction-button"
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleOpenMalfunctionDialog(bike.id)}
                                        >
                                            <ReportProblemOutlinedIcon/>
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
                <ReportMalfunctionDialog
                    open={openMalfunctionDialog}
                    bikeId={malfunctionBikeId}
                    closeDialog={handleCloseMalfunctionDialog}
                    reportMalfunction={props.reportMalfunction}/>
            </>
            :
            <Typography className={classes.typography}>No bikes rented</Typography>
    )
}

export default RentedBikesList;
