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

import BeerTable2 from '../../components/BeerTable/BeerTable2';




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
        width: '90%'
    },
    header: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2)
    },
    searchField: {
        width: '40%'
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

function createData(name, brewery, abv, type, location, id) {
    return { name, brewery, abv, type, location, id };
}

const beerData = [
    createData("Boulevard Wheat", "Boulevard", 4.5, "American Wheat", "Kansas City, MO", 1),
    createData("Snapper", "Logboat", 7.2, "IPA", "Columbia, MO", 2),
    createData("Stone IPA", "Stone Brewing Co", 7.6, "IPA", "Estiglio, CA", 3),
    createData("Breakfast Stout", "Founders", 9.2, "Stout", "Lansing, MI", 4),
    createData("Cosmic IPA", "Boulevard", 5.5, "American IPA", "Kansas City, MO", 5),
    createData("Chocolate Milk Stout", "4Hands", 4.4, "Milk Stout", "St. Louis, MO", 6),
    createData("Dunkel", "KC Bier Company", 6, "Dark Lager", "Kansas City, MO", 7),
    createData("Buffalo Sweat", "Tallgrass Brewing Co", 6.2, "Stout", "Manhattan, KS", 8),
    createData("Porter", "Founders", 6.2, "Porter", "Lansing, MI", 9),
    createData("Brooklyn Lager", "Brooklyn Brewery", 5.1, "American Lager", "New York City, NY", 10),

]

class PersonalBeers extends Component {
    state = {
        query: "",
        queryType: "name",
        fullBeerList: beerData,
        filtered: beerData,
    }



    handleQueryChange = (event) => {
        this.setState({ query: event.target.value })
        let filteredBeers = this.state.fullBeerList;
        filteredBeers = filteredBeers.filter(beer => {
            return beer[this.state.queryType].toString().toLowerCase().search(
                event.target.value.toString().toLowerCase()) !== -1
        })
        console.log(filteredBeers)
        this.setState({ filtered: filteredBeers })
    }


    filterSelect = (event) => {
        this.setState({ queryType: event.target.value })
        setTimeout(() => console.log(this.state.queryType), 3000)
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

                <BeerTable beerData={this.state.filtered} />
                {/* <BeerTable2 /> */}
            </Paper>





        )
    }
}


PersonalBeers.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PersonalBeers);