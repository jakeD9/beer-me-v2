import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    beerCounter: {
        width: '100%',
        margin: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    heading: {
        marginTop: theme.spacing(2),    
    },
    count: {
        margin: theme.spacing(4),
    },
    button: {
        marginBottom: theme.spacing(2),
        marginLeft: 'auto',
        marginRight: 'auto'
    }

}));

function BeerCounter(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.beerCounter}>
            <Typography align='center' display='block' variant='h4' className={classes.heading}>
                Your beer count:
            </Typography>
            <Typography align='center' color='primary' display='block' variant='h2' className={classes.count}>
                {props.beerCount}
            </Typography>
            <Button variant='outlined' className={classes.button} onClick={() => props.linkHandler("My Beers")}>
                View All &rarr;
            </Button>
        </Paper>


    )
}

export default BeerCounter