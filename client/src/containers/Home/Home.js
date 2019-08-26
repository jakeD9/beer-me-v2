import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BeerCounter from '../../components/BeerCounter/BeerCounter'
import AddBeerLink from '../../components/AddBeerLink/AddBeerLink'
import beerImg from '../../img/beer.jpg'

const useStyles = makeStyles(theme => ({

    homeContainer: {
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            marginRight: theme.spacing(4)
        }
    },
    sideColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    splash: {
        width: "60%",
        margin: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            width: '100%',
        }
    },
    heading: {
        margin: theme.spacing(2)
    },
    subheading: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(4),
    },
    imgContainer: {
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    img2: {
        maxWidth: '85%',
        height: 'auto',
        margin: theme.spacing(2),
        borderRadius: 4,
    }

}));

function Home(props) {
    const classes = useStyles();

    return (
        <div className={classes.homeContainer}>
            <Paper className={classes.splash}>
                <Typography align='center' variant='h4' className={classes.heading}>
                    Welcome to BeerMe!
                </Typography>
                <Typography align='center' variant='subtitle1' className={classes.subheading}>
                    Your personal tool for all things craft beer.
                </Typography>
                <figure className={classes.imgContainer}>
                    <img src={beerImg} className={classes.img2} />

                </figure>
            </Paper>
            <div className={classes.sideColumn}>
                <BeerCounter beerCount={props.beerCounter}/>
                <AddBeerLink />
            </div>
        </div>


    )
}

export default Home