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
    }
});

class Search extends Component {
    state = {
        query: "",
        results: null,
        loading: false,
        context: []
    }

    handleQueryChange = (event) => {
        this.setState({ query: event.target.value })
    }

    executeBeerSearch = (event) => {
        event.preventDefault();
        API.searchBeers(this.state.query)
            .then(response => {
                this.setState({ results: response })
                console.log(this.state.results)
            })
    }

    addBeer = (id) => {
        let beerToAdd = this.state.results.find(beer => beer._id === id)
        API.addBeer(beerToAdd)
            .then(response => {
                console.log(response)
                this.setState({ context: response[0].msg })
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
                        s className={classes.button}
                    >
                        Search
                    </Button>
                </form>
                {floater}
                <Divider className={classes.divider} />
                {this.state.results ? (
                    <div className={classes.beerContainer}>
                        {this.state.results.map(beer => (
                            <BeerItem
                                key={beer._id}
                                source={beer.source}
                                name={beer.name}
                                brewery={beer.brewery}
                                abv={beer.abv}
                                type={beer.type}
                                location={beer.location}
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