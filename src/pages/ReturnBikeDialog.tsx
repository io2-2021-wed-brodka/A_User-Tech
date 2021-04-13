import {
    Button,
    createStyles,
    List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, Theme, Typography
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { getRentedBikes } from "../api/bikes/rentedBikes";
import { returnRentedBike } from "../api/bikes/returnBikes";
import { getStations } from "../api/stations/getStations";
import { Bike } from "../models/bike";
import { Station } from "../models/station";


const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        margin: '1em',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24em',
    },
    content: {
        display: "flex",
    },
    typography: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    media: {
        height: 160,
    },
    expand: {
        height: 'auto',
        verticalAlign: 'middle',
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        float: "right",
    },
    expandOpen: {
        verticalAlign: 'middle',
        transform: 'rotate(180deg)',
    },
    listScrollable: {
        maxHeight: "100%",
        overflow: 'auto'
    }
}),
);
interface ReturnDialogProps {
    bikeId: string,
    closeDialog: any,
    setBikes: React.Dispatch<React.SetStateAction<Bike[]>>;
}
const ReturnBikeDialog = (props: ReturnDialogProps) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [stations, setStations] = useState<Station[]>([]);

    useEffect(() => {
        getStations().then(res => {
            if (res.isError) {
                enqueueSnackbar("Could not return bike", { variant: "error" });
                return;
            }
            setStations(res.data || []);
        });
    }, [enqueueSnackbar]);

    const returnBikeClick = (stationId: string) => {
        let tmpBike = props.bikeId;

        if (tmpBike.length < 1) {
            enqueueSnackbar("Could not return this bike", { variant: "error" });
            return;
        }

        returnRentedBike(tmpBike, stationId).then(res => {
            if (res.isError) {
                enqueueSnackbar("Something went wrong", { variant: "error" });
            }
            else {
                enqueueSnackbar("Bike returned", { variant: "success" });
                props.setBikes(prev => prev.filter(b => b.id !== tmpBike));
                getRentedBikes().then(res => {
                    if (res.isError) {
                        enqueueSnackbar("Could not get rented bikes", { variant: "error" });
                    }
                    else {
                        props.setBikes(res.data || []);
                    }
                });
            }
        });
        props.closeDialog();
    };

    return (
        stations.length > 0 ?
            <div className={classes.listScrollable}>
                <List>
                    {
                        stations.map((station) => {
                            return (<div key={station.id}>
                                <ListItem>
                                    <ListItemText>
                                        {station.name}
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <Button
                                            size="small"
                                            color="primary"
                                            onClick={() => returnBikeClick(station.id)}>
                                            Return
                                    </Button>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </div>
                            );
                        })
                    }
                </List>
            </div>
            :
            <Typography className={classes.typography}>No stations available</Typography>
    )
};


export default ReturnBikeDialog;