import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import API from '../../utils/API'
import Divider from '@material-ui/core/Divider';
import BeerItem from '../BeerItem/BeerItem';
import FloaterRed from '../Floater/FloaterRed'
import FloaterGreen from '../Floater/FloaterGreen';


const styles = theme => ({
    root: {
        padding: theme.spacing(3, 3),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '35%',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        }
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        }
    },
    button: {
        width: 'auto',
        marginTop: theme.spacing(3)
    },
    divider: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4)
    },
    beerContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    floatContainer: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

class Search extends Component {
    state = {
        query: "",
        results: undefined,
        keyToRemove: "",
        context: []
    }

    handleQueryChange = (event) => {
        this.setState({ query: event.target.value })
    }

    executeBeerSearch = (event) => {
        event.preventDefault();
        this.setState({ context: [] })
        API.searchBeers(this.state.query)
            .then(response => {
                console.log(response)
                if (response.length === 0) this.setState({ context: "No results found, try creating it?" })
                else this.setState({ results: response })
            })
    }

    addBeer = (id) => {
        let beerToAdd = this.state.results.find(beer => beer._id === id)
        API.addBeer(beerToAdd)
            .then(response => {
                this.setState({ keyToRemove: beerToAdd._id, context: response[0].msg })
                this.props.refreshHandler()
            })
    }

    render() {
        const { classes } = this.props

        let floater = (
            <div></div>
        )
        if (this.state.context === "Success, beer added") {
            floater = <FloaterGreen message={this.state.context} />
        } else if (this.state.context.length > 0) {
            floater = <FloaterRed message={this.state.context} />
        }

        return (
            <Paper className={classes.root}>
                <Typography align='center' variant='h4'>
                    Search for Beers by Name
                </Typography>
                <form noValidate onSubmit={this.executeBeerSearch} className={classes.form}>
                    <TextField
                        id="beer-search"
                        label="Beer Name"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleQueryChange}
                    />
                    <Button
                        type="submit"
                        color="primary"
                        className={classes.button}
                    >
                        Search
                    </Button>
                </form>
                <div className={classes.floatContainer}>
                    {floater}
                </div>
                <Divider className={classes.divider} />
                {this.state.results ? (
                    <div className={classes.beerContainer}>
                        {this.state.results.map(beer => (
                            <BeerItem
                                activateSlide={beer._id === this.state.keyToRemove ? false : true}
                                key={beer._id}
                                source={beer.source}
                                name={beer.name}
                                brewery={beer.brewery}
                                location={beer.location}
                                abv={beer.abv}
                                type={beer.type}
                                buttonText={"Add to my list"}
                                addToUserBeerList={() => this.addBeer(beer._id)} />
                        ))}
                    </div>


                ) : (
                        <Typography align='center' variant='h5'>
                            Results will appear here
                        </Typography>
                    )}
            </Paper>
        )
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Search);