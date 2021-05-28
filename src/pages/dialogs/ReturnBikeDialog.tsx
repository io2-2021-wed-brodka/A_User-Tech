import {
    Button,
    createStyles,
    Dialog,
    DialogContent,
    DialogTitle,
    List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, TextField, Theme, Typography
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { ChangeEvent, useEffect, useState } from "react";
import { reportMalfunction } from "../../api/malfunctions/reportMalfunction";
import { getActiveStations } from "../../api/stations/getActiveStations";
import Transition from "../../layout/Transition";
import { Station } from "../../models/station";


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
    ReturnBike: (bikeId: string, stationId: string) => void;
    withMalfunction?: boolean;
    open: boolean;
    handleCloseWindow: () => void;
}
const ReturnBikeDialog = (props: ReturnDialogProps) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [stations, setStations] = useState<Station[]>([]);
    const [description, setDescription] = useState<string>("");

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    useEffect(() => {
        getActiveStations().then(res => {
            if (res.isError) {
                enqueueSnackbar("Could not return bike", { variant: "error" });
                return;
            }
            setStations(res.data?.stations || []);
        });
    }, [enqueueSnackbar]);

    const returnBikeClick = async (stationId: string) => {
        const tmpBike = props.bikeId;
        if (props.withMalfunction) {
            const response = await reportMalfunction(tmpBike, description);
            if (response.isError) {
                enqueueSnackbar(`Reporting malfunction failed: ${response.errorMessage}`, { variant: "error" });
                return;
            } else {
                enqueueSnackbar("Malfunction reported", { variant: "success" });
            }
        }
        props.ReturnBike(tmpBike, stationId);
        props.closeDialog();
    };

    return (<>
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleCloseWindow}
            aria-labelledby="return-dialog-slide-title"
            aria-describedby="return-dialog-slide-description"
        >
            {props.withMalfunction && <>
                <DialogTitle id="malfunction-dialog-slide-title">
                    {`Report malfunction for bike: ${props.bikeId}`}
                </DialogTitle>
                <DialogContent>
                    <TextField multiline onChange={handleDescriptionChange} placeholder="Malfunction description" />
                </DialogContent></>}
            <DialogTitle id="return-dialog-slide-title">
                {"Choose return station for bike: " + props.bikeId}
            </DialogTitle>
            <DialogContent>
                {stations.length > 0 ?
                    <div id="return-bike-dialog-list" className={classes.listScrollable}>
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
                    <Typography className={classes.typography}>No stations available</Typography>}
            </DialogContent>
        </Dialog>
    </>

    )
};


export default ReturnBikeDialog;