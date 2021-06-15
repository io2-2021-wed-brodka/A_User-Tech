import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CallIcon from '@material-ui/icons/Call';
import React from 'react';
const useStyles = makeStyles({
    container: {
        marginTop: '1em',
        width: '100%',
        display: 'flex',
    },
    paper: {
        padding: '1em',
        margin: '1em',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        margin: '1em',
    },
    subheader: {
        paddingRight: '0.5em',
    },
    oneliner: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});

const Contact = () => {
    const classes = useStyles();
    return (<div className={classes.container}>
                <div>
                    <Typography variant='h5' className={classes.subheader}>
                        Contact:
                    </Typography>
                    <div className={classes.oneliner} >
                        <Typography variant="subtitle1" gutterBottom className={classes.subheader}>
                        Phone number: +48 222 10 10 10
                        </Typography>
                        <CallIcon />
                    </div>
                </div>
            </div>
    )
}

export default Contact;