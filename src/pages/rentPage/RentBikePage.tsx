import {
    Avatar, Collapse, IconButton,
    List, ListItem, ListItemAvatar,
    ListItemSecondaryAction, ListItemText,
    makeStyles, Paper, Typography
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { getStations } from "../../api/stations/getStations";
import { Station } from "../../models/station";
import StationBikesList from "./StationBikesList";

const useStyles = makeStyles({
    paper: {
        padding: '1em',
        margin: '1em',
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
    },
    typography: {
    }
});


const RentBikePage = () =>{
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [stations, setStations] = useState<[Station, boolean][]>([]);
    useEffect(() => {
        getStations().then(res => {
            if(res.isError)
            {
                enqueueSnackbar("Could not retrive stations", { variant: "error" });
                return;
            }
            setStations((res.data || []).map(x => [x, false] ));
        });
    }, [enqueueSnackbar]);

    const handleOpenStationClick = (stationIndex: number) =>
    {
        let tmpStations = [...stations];
        tmpStations[stationIndex][1] = !tmpStations[stationIndex][1];
        setStations(tmpStations);
    };

    return (
        stations.length > 0 ?
            <>
            <Paper className={classes.paper}>
                <Typography className={classes.typography}>Available stations:</Typography>
                <List className={classes.list}>
                    {
                        stations.map((station, stationIndex) => {
                            return (<div key={station[0].id}>
                                <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <HomeIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={station[0].name}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete"
                                                onClick={() => handleOpenStationClick(stationIndex) }
                                            >
                                            { station[1] ? (
                                                        <ExpandLess />
                                                    ) : (
                                                        <ExpandMore />
                                                    )}
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                </ListItem>                
                                <Collapse   key={station[0].id}
                                            in={station[1]}
                                            timeout="auto"
                                            unmountOnExit>
                                 <StationBikesList stationId={station[0].id} />
                                </Collapse>
                            </div>       
                            );
                        })
                    }
                </List>
            </Paper>
            </>
            :
            <Typography className={classes.typography}>No stations available</Typography>
    )
};


export default RentBikePage;