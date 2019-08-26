import React, { Component } from 'react';
import BeerItem from '../../components/BeerItem/BeerItem';
import Divider from '@material-ui/core/Divider';
import FloaterRed from '../../components/Floater/FloaterRed';
import FloaterGreen from '../../components/Floater/FloaterGreen';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PassToParentField from '../../components/TextFields/PassToParentField';
import Button from '@material-ui/core/Button';
import API from '../../utils/API';


const styles = theme => ({
    createBeerContainer: {
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
        }
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        margin: theme.spacing(2),
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginLeft: theme.spacing(4)
        }
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(3),
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    formHeading: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2)
    },
    formSubtitle: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3)
    },
    divider: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: theme.spacing(2)
    },
    itemContainer: {
        width: '40%',
        margin: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3)
    }
})



class CreateBeer extends Component {
    state = {
        name: "",
        brewery: "",
        location: "",
        type: "",
        abv: "",
        context: {
            error: null,
            success: null
        }
    }

    onChildChange = (childName, childValue) => {
        let newState = {};
        newState[childName] = childValue;
        this.setState(newState)
    }

    sendBeer = (event) => {
        const validation = (string) => {
            let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]/;
            if (format.test(string) || string.length == 0) {
                return false
            } else return true
        }
        event.preventDefault();
        let beerToSend = {
            name: this.state.name,
            brewery: this.state.brewery,
            location: this.state.location,
            type: this.state.type,
            abv: this.state.abv
        }
        let validationTest = Object.keys(beerToSend).filter(key => {
            return !validation(beerToSend[key])
        })
        if (validationTest.length > 0) {
            this.setState({ context: { error: "No special characters or blank fields allowed" } })
        } else {
            API.createBeer(beerToSend)
                .then(response => { 
                    this.setState({ 
                        context: { 
                            error: null,
                            success: response[0].msg 
                        } 
                    }) 
                })
        }
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.createBeerContainer}>
                <Paper className={classes.formContainer}>
                    <Typography variant="h4" align="center" className={classes.formHeading}>
                        Add a Beer
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="subtitle1" align="center" className={classes.formSubtitle}>
                        If you haven't already, please try searching for one first!
                    </Typography>
                    <form noValidate className={classes.form} onSubmit={this.sendBeer}>
                        {this.state.context.error ? <FloaterRed message={this.state.context.error}/> : ""}
                        {this.state.context.success ? <FloaterGreen message={this.state.context.success} /> : ""}
                        <PassToParentField
                            name="name"
                            label="Beer Name"
                            type="text"
                            margin="normal"
                            required={true}
                            error={this.state.context.error ? true : false}
                            onFormChange={this.onChildChange}
                        />
                        <PassToParentField
                            name="brewery"
                            label="Brewery"
                            type="text"
                            margin="normal"
                            required={true}
                            error={this.state.context.error ? true : false}
                            onFormChange={this.onChildChange}
                        />
                        <PassToParentField
                            name="location"
                            label="City, State"
                            type="text"
                            margin="normal"
                            required={true}
                            error={this.state.context.error ? true : false}
                            onFormChange={this.onChildChange}
                        />
                        <PassToParentField
                            name="type"
                            label="Type"
                            type="text"
                            margin="normal"
                            required={true}
                            error={this.state.context.error ? true : false}
                            onFormChange={this.onChildChange}
                        />
                        <PassToParentField
                            name="abv"
                            label="ABV"
                            type="number"
                            margin="normal"
                            required={true}
                            error={this.state.context.error ? true : false}
                            onFormChange={this.onChildChange}
                        />
                        <Button
                            type="submit"
                            color="primary"
                            className={classes.button}
                        >
                            Submit
                        </Button>
                    </form>
                </Paper>
                <div className={classes.itemContainer}>
                    <BeerItem
                        source={"New Beer"}
                        name={this.state.name}
                        brewery={this.state.brewery}
                        location={this.state.location}
                        type={this.state.type}
                        abv={this.state.abv}
                        buttonText={""}
                    />
                </div>

            </div>


        )
    }
}

CreateBeer.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateBeer);