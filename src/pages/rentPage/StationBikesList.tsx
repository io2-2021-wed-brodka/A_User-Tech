import {
    Avatar, Button,
    List, ListItem, ListItemAvatar,
    ListItemSecondaryAction, ListItemText,
    makeStyles, Paper, Typography
} from "@material-ui/core";
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import React, { useEffect, useState } from "react";
import { getBikesFromStation } from "../../api/bikes/getBikesFromStation";
import { UnrentedBike } from "../../models/unrentedBike";
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

const StationBikesList = (props: StationBikesListProps) =>{
    const classes = useStyles();
    const [bikes, setBikes] = useState<UnrentedBike[]>([]);

    useEffect(() => {
        if(props.stationId === undefined) 
            return;

        getBikesFromStation(props.stationId).then(res => {
            setBikes(res.data || []);
    });
    }, [props.stationId]);

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
                                    <Button size="small">Rent</Button>
                                </ListItemSecondaryAction>
                        </ListItem>                       
                        );
                    })
                }
            </List>
        </Paper>
        </>
        :
        <Typography className={classes.typography}>No bikes available</Typography>
    )
};


export default StationBikesList;