import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    floaterErr: {
        marginTop: theme.spacing(2),
        backgroundColor: "#ef9a9a",
        width: "100%",
        borderRadius: "4px",
        border: "1px solid #f44336",
        textAlign: "center"
    },
}));

function FloaterRed(props) {
    const classes = useStyles();
    return (
        <div className={classes.floaterErr}>
            {props.message}
        </div>
    )
}

export default FloaterRed