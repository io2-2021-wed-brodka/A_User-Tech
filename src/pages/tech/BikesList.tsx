import { Avatar, Button, createStyles, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Theme } from '@material-ui/core';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import { useSnackbar } from 'notistack';
import React from 'react';
import { blockBike } from '../../api/bikes/blockBike';
import { unblockBike } from '../../api/bikes/unblockBike';
import { BikeStatus } from '../../models/bikeStatus';
import { StationWithBikes } from '../../models/station';
import { UnrentedBike } from '../../models/unrentedBike';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        blockButton: {
            color: "#ee6002"
        },
        unblockButton: {
            color: "#09af00"
        }
    }),
);

export interface BikesListProps {
    stationId: string;
    bikes: UnrentedBike[];
    setStations: React.Dispatch<React.SetStateAction<StationWithBikes[]>>
}

const BikesList = (props: BikesListProps) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const updateBikeStatus = (bike: UnrentedBike, status: string): UnrentedBike => {
        bike.status = status;
        return bike;
    };

    const handleBlock = (id: string) => {
        blockBike(id).then((response) => {
            if (response.isError) {
                enqueueSnackbar(`Failed to block bike: ${response.errorMessage}`, { variant: "error" });
            } else {
                props.setStations(prev => prev.map(s => {
                    if (s.id !== props.stationId) return s;
                    return { ...s, bikes: s.bikes.map(b => b.id === id ? updateBikeStatus(b, BikeStatus.blocked) : b) }
                }))
            }
        });
    };

    const handleUnblock = (id: string) => {
        unblockBike(id).then((response) => {
            if (response.isError) {
                enqueueSnackbar(`Failed to unblock bike: ${response.errorMessage}`, { variant: "error" });
            } else {
                props.setStations(prev => prev.map(s => {
                    if (s.id !== props.stationId) return s;
                    return { ...s, bikes: s.bikes.map(b => b.id === id ? updateBikeStatus(b, BikeStatus.available) : b) }
                }))
            }
        });
    };

    return (<>
        <List id="tech-station-collapse" component="div" disablePadding>
            {bikes.map((b, index) => {
                return (<ListItem id="bike-entry">
                    <ListItemAvatar>
                        <Avatar>
                            <DirectionsBikeIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={b.id} />
                    <ListItemSecondaryAction >
                        {b.status === BikeStatus.available &&
                            <Button className={classes.blockButton} onClick={() => handleBlock(b.id)}>
                                Block
                                </Button>}
                        {b.status === BikeStatus.blocked && <Button className={classes.unblockButton} onClick={() => handleUnblock(b.id)}>
                            Unblock
                                </Button>}
                        {b.status === BikeStatus.reserved && <Button className={classes.unblockButton} disabled>
                            Reserved
                                </Button>}

                    </ListItemSecondaryAction>
                </ListItem>)
            })}
        </List>
    </>)

}

export default BikesList;