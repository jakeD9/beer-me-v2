import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';


const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(2)
    },
    heading: {
        margin: theme.spacing(2)
    },
    icon: {
        fontSize: 160,
        margin: 'auto',
        marginBottom: theme.spacing(2),
        '&:hover': {
            cursor: 'pointer',
            color: blue[800]
          },
    }
}));


function AddBeerLink(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.container}>
            <Typography align='center' display='block' variant='h4' className={classes.heading}>
                Add more Beers!
            </Typography>

            <AddBoxRoundedIcon className={classes.icon} />

        </Paper>


    )
}

export default AddBeerLink