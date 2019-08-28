import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => {
    return {
        card: {
            width: 400,
            height: 235,
            marginBottom: theme.spacing(2),
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            [theme.breakpoints.down('md')]: {
                width: '100%',
                marginLeft: 0,
                marginRight: 0
            }

        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    }

});


const BeerItem = (props) => {
    const classes = useStyles();

    return (
        <Slide direction="left" in={props.activateSlide} unmountOnExit timeout={1000}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.source}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.brewery}
                        <br />
                        {props.location}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {props.type}
                        <br />
                        ABV: {typeof props.abv === 'string' ? props.abv : props.abv + "%"}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={props.addToUserBeerList}>{props.buttonText}</Button>
                </CardActions>
            </Card>
        </Slide>

    );

}



export default BeerItem