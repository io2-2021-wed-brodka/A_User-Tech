import {
    Avatar, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List, ListItem, ListItemAvatar,
    ListItemSecondaryAction, ListItemText,
    makeStyles, Paper, Slide, Typography
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getBikesFromStation } from "../../api/bikes/getBikesFromStation";
import { rentBike } from "../../api/bikes/rentBike";
import { UnrentedBike } from "../../models/unrentedBike";
const useStyles = makeStyles({
paper: {
   padding: '1em',
   margin: '1em',
   alignItems: 'center',
   justifyContent: 'center',
},
rentButton: {
    background: '#F87172',
    color: "#FFFFFF",
    '&:hover': {
        backgroundColor: "#DAE0E2"
    }
},
list: {
},
typography: {
}
});

interface StationBikesListProps {
    stationId: string
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const StationBikesList = (props: StationBikesListProps) =>{
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [bikes, setBikes] = useState<UnrentedBike[]>([]);
    const [openSlidingWindow, setOpenSlidingWindow] = useState<boolean>(false);
    const [rentBikeId, setRentBikeId] = useState<string>('');

    useEffect(() => {
        
        if(props.stationId === undefined)
        {
            enqueueSnackbar("Could not retrive bikes", { variant: "error" });
            return;
        }
        getBikesFromStation(props.stationId).then(res => {
            
            if(res.isError)
            {
                enqueueSnackbar("Could not retrive bikes", { variant: "error" });
                return;
            }
            setBikes(res.data || []);
        });
    }, [props.stationId, enqueueSnackbar]);

    const rentBikeClickHandle = (id: string) => {
        setRentBikeId(prev => id);
        setOpenSlidingWindow(prev => true);
    } 

    const handleCloseWindow = () => setOpenSlidingWindow(prev=> false);
    
    const rentBikeCall = () => {
        let tmpBike = rentBikeId;
        
        if(tmpBike.length < 1)
        {
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

        setOpenSlidingWindow(prev => false);
        setRentBikeId(prev => '');
        history.push('/rent');
    }
    
    return (
    bikes.length > 0 ?
        <>
        <Paper className={classes.paper}>
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
                                    <Button size="small"
                                            className={classes.rentButton}
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
        </Paper>
        </>
        :
        <Typography className={classes.typography}>No bikes available</Typography>
    )
};


export default StationBikesList;
