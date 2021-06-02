import { Collapse, createStyles, List, ListItem, ListItemText, makeStyles, Theme } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { getAllStations } from '../../api/stations/getAllStations';
import { Station } from '../../models/station';
import BikesList from './BikesList';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

const TechStationsList = () => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [stations, setStations] = useState<Station[]>([]);
    const [open, setOpen] = useState<boolean[]>([]);

    useEffect(() => {
        getAllStations().then(r => {
            if (r.isError) {
                enqueueSnackbar(`Could not get stations list: ${r.errorMessage}`, { variant: "error" })
            }
            else {
                setStations(r.data?.stations || [])
            }
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        setOpen(Array(stations.length).fill(false));
    }, [stations.length])

    const handleClick = (index: number) => {
        setOpen(prev => {
            const copy = [...prev];
            copy[index] = !copy[index];
            return copy;
        })
    };

    return (<>
        <List id="tech-station-list" className={classes.root}>
            {stations.map((s, index) => {
                return (
                <div id="tech-station">
                    <ListItem id="tech-station-card" button onClick={() => handleClick(index)}>
                        <ListItemText primary={s.name} secondary={'id: ' + s.id} />
                        {open[index] ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open[index]}>
                        <BikesList stationId={s.id} />
                    </Collapse>
                </div>
                )
            })}
        </List>
    </>)

}

export default TechStationsList;