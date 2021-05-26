import { Avatar, Button, createStyles, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Theme } from '@material-ui/core';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { blockBike } from '../../api/bikes/blockBike';
import { getAllBikesFromStation } from '../../api/bikes/getBikesFromStation';
import { unblockBike } from '../../api/bikes/unblockBike';
import { BikeStatus } from '../../models/bikeStatus';
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
}

const BikesList = (props: BikesListProps) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [bikes, setBikes] = useState<UnrentedBike[]>([]);

    useEffect(() => {
        getAllBikesFromStation(props.stationId).then(r => {
            if (r.isError) {
                enqueueSnackbar(`Could not get stations list: ${r.errorMessage}`, { variant: "error" })
            }
            else {
                setBikes(r.data?.bikes || [])
            }
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const updateBikeStatus = (bike: UnrentedBike, status: string): UnrentedBike => {
        bike.status = status;
        return bike;
    };

    const handleBlock = (id: string) => {
        blockBike(id).then((response) => {
            if (response.isError) {
                enqueueSnackbar(`Failed to block bike: ${response.errorMessage}`, { variant: "error" });
            } else {
                setBikes(prev => prev.map(b => b.id === id ? updateBikeStatus(b, BikeStatus.blocked) : b));
            }
        });
    };

    const handleUnblock = (id: string) => {
        unblockBike(id).then((response) => {
            if (response.isError) {
                enqueueSnackbar(`Failed to unblock bike: ${response.errorMessage}`, { variant: "error" });
            } else {
                setBikes(prev => prev.map(b => b.id === id ? updateBikeStatus(b, BikeStatus.available) : b));
            }
        });
    };

    return (<>
        <List component="div" disablePadding>
            {bikes.map((b, index) => {
                return (<ListItem>
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