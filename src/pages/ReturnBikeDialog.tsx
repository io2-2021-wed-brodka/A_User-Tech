import {
    Button,
    createStyles,
    List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, Theme, Typography
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { getStations } from "../api/stations/getStations";
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
}),
);

const ReturnBikeDialog = () =>{
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();    
    const [stations, setStations] = useState<Station[]>([]);
    
    useEffect(() => {
        getStations().then(res => {
            if(res.isError)
            {
                enqueueSnackbar("Could not retrive stations", { variant: "error" });
                return;
            }
            setStations(res.data || []);
        });
    }, [enqueueSnackbar]);


    return (
        stations.length > 0 ?
            <>   
            <List>
                {
                    stations.map((station) => {
                        return (<div key={station.id}>
                            <ListItem>
                                <ListItemText>
                                    {station.name}
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <Button>
                                        Return
                                    </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </div>       
                        );
                    })
                }
            </List>             
            </>
            :
            <Typography className={classes.typography}>No stations available</Typography>
    )
};


export default ReturnBikeDialog;