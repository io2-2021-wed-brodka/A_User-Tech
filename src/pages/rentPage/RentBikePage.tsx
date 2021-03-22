import {
    Card, CardActionArea, CardContent, 
    CardMedia, Collapse, createStyles, 
    Icon, makeStyles, Theme, Typography
} from "@material-ui/core";
import clsx from 'clsx';
import { ExpandMore } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getStations } from "../../api/stations/getStations";
import { Station } from "../../models/station";
import StationBikesList from "./StationBikesList";
import BreakpointMasonry from "../../layout/BreakpointMasonry";


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

const RentBikePage = () =>{
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();    

    const cityImages = [
        "https://upload.wikimedia.org/wikipedia/commons/8/82/Melbourne_City_Bikes.JPG",
        "https://upload.wikimedia.org/wikipedia/commons/f/fb/Citybike_station_bikeMi_Milan_Italy_20101230.JPG",
        "https://www.researchgate.net/profile/Grzegorz-Karon/publication/329415886/figure/fig2/AS:700401628229633@1544000169355/City-bike-station-at-the-building-of-the-Faculty-of-Transport-of-the-Silesian-University.ppm",
        "https://media.izi.travel/cd9b44b4-d2c6-4ee4-a3ea-9296c8916cff/92ddf687-769b-41b4-beb4-90b25cf689c4_800x600.jpg",        
        "https://media.timeout.com/images/100920555/630/472/image.jpg",
        "https://www.tuwroclaw.com/pliki/duze_zdjecia/wiadomosci/rower_miejski_stacja_poziom.jpg",
        "https://s-trojmiasto.pl/zdj/c/n/9/1969/3000x0/1969607.jpg",
        "https://previews.123rf.com/images/rouslan/rouslan1806/rouslan180600032/106466940-budapest-hungary-march-22-2018-bubi-moll-rent-a-bike-station-in-front-of-the-famous-budapest-great-m.jpg",
    ];    

    const [imagesSet, setImageSet] = useState<boolean>(false);

    const [stations, setStations] = useState<[Station, boolean][]>([]);
    const [imagesIndexes, setImagesIndexes] = useState<number[]>([]);
    
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

    useEffect(() => {        
        if(!imagesSet && stations.length > 0)
        {
            let indexes = stations.map(_ => Math.floor(Math.random() * cityImages.length));
            setImagesIndexes(indexes);
            setImageSet(true);
        }        
    }, [stations, cityImages.length, imagesSet]);

    const handleOpenStationClick = (stationIndex: number) =>
    {
        let tmpStations = [...stations];                
        tmpStations[stationIndex][1] = !tmpStations[stationIndex][1];        
        setStations(tmpStations);
    };   

    return (
        stations.length > 0 ?
            <>                
                <BreakpointMasonry>
                    {
                        stations.map((station, stationIndex) => {
                            return (<div key={station[0].id}>
                                <Card className={classes.card} >
                                    <CardActionArea onClick={() => handleOpenStationClick(stationIndex)}>
                                        <CardMedia
                                        className={classes.media} 
                                        image={cityImages[imagesIndexes[stationIndex]]}                                        
                                        title="StationImage"/>
                                <CardContent className={classes.content}>
                                    <Typography className={classes.typography} variant="h6">
                                        {station[0].name}
                                    </Typography>        
                                
                                    <Icon   
                                        className={clsx(classes.expand, {
                                        [classes.expandOpen]: station[1],
                                        })}                                                            
                                        aria-expanded={station[1]}
                                        aria-label="show more"
                                        >
                                        <ExpandMore />
                                    </Icon>   
                                </CardContent>
                                </CardActionArea>
                                <Collapse in={station[1]} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <StationBikesList stationId={station[0].id} />
                                    </CardContent>
                                </Collapse>
                                </Card>
                            </div>       
                            );
                        })
                    }
                </BreakpointMasonry>
            </>
            :
            <Typography className={classes.typography}>No stations available</Typography>
    )
};


export default RentBikePage;