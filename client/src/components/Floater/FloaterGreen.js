import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    floaterScs: {
        marginTop: theme.spacing(2),
        backgroundColor: "#81c784",
        width: "100%",
        borderRadius: "4px",
        border: "1px solid #4caf50",
        textAlign: "center"
    }
}));

function FloaterGreen(props) {
    const classes = useStyles();
    return (
        <div className={classes.floaterScs}>
            {props.message}
        </div>
    )
}

export default FloaterGreen