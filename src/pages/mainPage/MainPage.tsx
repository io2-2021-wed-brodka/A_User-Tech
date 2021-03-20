import { Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import RentBikePage from '../rentPage/RentBikePage';
import RentedBikesList from './RentedBikesList';



const useStyles = makeStyles({
    paper: {
        padding: '1em',
        margin: '1em',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rentBikeButton: {
        margin: '0.5em auto',
        background: '#F87172',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        display: 'block'

    },
});

const MainPage = () => {

    let history = useHistory();
    const classes = useStyles();
    const rentBikeClick = () => {
        history.push("/rent");
    }

    return (
        <>
            <Button onClick={rentBikeClick} className={classes.rentBikeButton}>Rent bike</Button>
            <Paper className={classes.paper}>
                <RentedBikesList />
            </Paper>            
        </>
    )
}

export default MainPage;