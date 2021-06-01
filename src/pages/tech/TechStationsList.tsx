import { Collapse, createStyles, List, ListItem, ListItemText, makeStyles, Theme } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { getAllBikes } from '../../api/bikes/getAllBikes';
import { getAllStations } from '../../api/stations/getAllStations';
import { StationWithBikes } from '../../models/station';
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
    const [stations, setStations] = useState<StationWithBikes[]>([]);
    const [open, setOpen] = useState<boolean[]>([]);

    useEffect(() => {
        getAllStations().then(r => {
            if (r.isError) {
                enqueueSnackbar(`Could not get stations list: ${r.errorMessage}`, { variant: "error" })
            }
            else {
                const stationsArray = r.data?.stations;
                if (stationsArray) {
                    setStations(stationsArray.map(s => {
                        return { ...s, bikes: [] }
                    }))
                    stationsArray.forEach(station => {
                    });
                    getAllBikes().then(r => {
                        if (r.isError) {
                            enqueueSnackbar(`Could not get bikes list: ${r.errorMessage}`, { variant: "error" })
                        }
                        else {
                            const bikes = r.data?.bikes;
                            if (bikes) {
                                bikes.forEach(bike => {
                                    if (bike.station && bike.station.id) {
                                        setStations(prev => prev.map(s => {
                                            if (s.id !== bike.station.id) return s;
                                            return { ...s, bikes: [...s.bikes, bike] };
                                        }))
                                    }
                                });
                            }
                        }
                    })
                }
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
        <List className={classes.root}>
            {stations.map((s, index) => {
                return (<><ListItem button onClick={() => handleClick(index)}>
                    <ListItemText primary={s.name} secondary={'id: ' + s.id} />
                    {open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                    <Collapse in={open[index]}>
                        <BikesList stationId={s.id} bikes={s.bikes} setStations={setStations} />
                    </Collapse>
                </>
                )
            })}
        </List>
    </>)

}

export default TechStationsList;