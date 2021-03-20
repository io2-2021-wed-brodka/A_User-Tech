import {
    Avatar, Box, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, createStyles, IconButton,
    List, ListItem, ListItemAvatar,
    ListItemSecondaryAction, ListItemText,
    makeStyles, Paper, Theme, Typography
} from "@material-ui/core";
import clsx from 'clsx';
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { getStations } from "../../api/stations/getStations";
import { Station } from "../../models/station";
import StationBikesList from "./StationBikesList";

const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {        
        margin: '1em',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '20em',
    },
    list: {
    },
    typography: {
    },
    media: {
        height: 140,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
}),
);


const RentBikePage = () =>{
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [expanded, setExpanded] = React.useState(false);


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
        setStations(tmpStations);
        tmpStations[stationIndex][1] = !tmpStations[stationIndex][1];
        //setExpanded(!expanded);
    };

    return (
        stations.length > 0 ?
            <>

                {/* <Typography className={classes.typography}>Available stations:</Typography> */}
                <Box display="flex" flexWrap="wrap">
                    {
                        stations.map((station, stationIndex) => {
                            return (<div key={station[0].id}>
                                <Card className={classes.card} >
                                    <CardActionArea onClick={() => handleOpenStationClick(stationIndex)}>
                                        <CardMedia
                                        className={classes.media} 
                                        image="https://cdn.officelist.pl/cache/35/47/35473c1c47cc0dabb9bc9bc2fea45a1c.jpg?h=800&w=1280&auto=enhance&q=90&s=d5b2a76c421b0e5ed929ea658e469ba0"
                                        title="Lizard"/>
                                <CardContent>
                                    <Typography variant="h6">
                                        {station[0].name}
                                    </Typography>        
                                
                                <IconButton   
                                className={clsx(classes.expand, {
                                [classes.expandOpen]: station[1],
                                })}                                                            
                                aria-expanded={station[1]}
                                aria-label="show more"
                                >
                                    <ExpandMore />
                                </IconButton>   
                                </CardContent>
                                </CardActionArea>
                                <Collapse   in={station[1]} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <StationBikesList stationId={station[0].id} />
                                    </CardContent>
                                </Collapse>
                                </Card>
                            </div>       
                            );
                        })
                    }
                </Box>
            </>
            :
            <Typography className={classes.typography}>No stations available</Typography>
    )
};


export default RentBikePage;