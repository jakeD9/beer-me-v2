import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import BeerTable from '../../components/BeerTable/BeerTable';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import API from '../../utils/API'

const styles = theme => ({
    personalContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.spacing(2)
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '90%',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center'
        }
    },
    header: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2)
    },
    searchField: {
        width: '40%',
        [theme.breakpoints.down('md')]: {
            width: '80%',
        }
    },
    formControl: {
        minWidth: 140,
        margin: theme.spacing(2)
    },
    divider: {
        width: '80%',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    }
})



class PersonalBeers extends Component {
    state = {
        query: "",
        queryType: "name",
        fullBeerList: this.props.beerData,
        filtered: this.props.beerData,
        context: []
    }

    handleQueryChange = (event) => {
        this.setState({ query: event.target.value })
        let filteredBeers = this.state.fullBeerList;
        filteredBeers = filteredBeers.filter(beer => {
            return beer[this.state.queryType].toString().toLowerCase().search(
                event.target.value.toString().toLowerCase()) !== -1
        })
        this.setState({ filtered: filteredBeers })
    }

    filterSelect = (event) => {
        this.setState({ queryType: event.target.value })
    }

    deleteBeer = (id) => {
        const conf = window.confirm("Are you sure? You can always add it back.")
        this.props.refreshHandler()
        if (conf) {
            API.deleteBeer(id)
                .then(response => {
                    let newFullList = this.state.fullBeerList
                    newFullList = newFullList.filter(beer => {
                        return beer._id !== id
                    })
                    this.setState({ fullBeerList: newFullList, filtered: newFullList })
                })
        } else return
    }

    render() {
        const { classes } = this.props

        return (
            <Paper className={classes.personalContainer}>
                <Typography align='center' variant='h4' className={classes.header}>
                    My Beers
                </Typography>
                <div className={classes.searchContainer}>
                    <TextField
                        id="filter"
                        label="Search"
                        type="search"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleQueryChange}
                        className={classes.searchField}
                    />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-simple">
                            Filter By
                        </InputLabel>
                        <Select
                            value={this.state.queryType}
                            onChange={this.filterSelect}
                            input={<OutlinedInput name="age" id="outlined-age-simple" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"name"}>Name</MenuItem>
                            <MenuItem value={"brewery"}>Brewery</MenuItem>
                            <MenuItem value={"abv"}>ABV</MenuItem>
                            <MenuItem value={"type"}>Type</MenuItem>
                            <MenuItem value={"location"}>Location</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <Divider className={classes.divider} />

                <BeerTable beerData={this.state.filtered} delHandler={this.deleteBeer} />
            </Paper>





        )
    }
}


PersonalBeers.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PersonalBeers);