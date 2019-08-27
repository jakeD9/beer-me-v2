import React, { Component } from 'react';
import API from '../../utils/API';
import { Redirect } from 'react-router-dom'
import NavFix from '../../components/NavFix/NavFix';
import Search from '../../components/Search/Search';
import Home from '../../containers/Home/Home';
import CreateBeer from '../CreateBeer/CreateBeer';
import PersonalBeers from '../PersonalBeers/PersonalBeers'


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

class Dashboard extends Component {
    state = {
        auth: {
            loggedOut: false,
            isAuthenticated: true,
            email: "",
            name: "User",
            mId: undefined
        },
        ui: {
            display: "Home",
            report: false,
            settings: false
        },
        data: {
            personal: {
                beers: []
            },
        }
    };

    navigationToggle = (name) => {
        this.setState({ ui: { display: name } })
        setTimeout(() => console.log(this.state.ui.display), 1000)
    }

    componentDidMount = () => {
        API.verifyUser()
            .then(response => {
                if (!response) return
                const { email, _id, name } = response;
                this.setState({
                    auth: {
                        email,
                        name,
                        mId: _id,
                        isAuthenticated: true,
                    }
                })
                API.getBeers()
                    .then(response => {
                        if (!response) return
                        this.setState({
                            data: {
                                personal: {
                                    beers: response
                                }
                            }
                        })
                    })
            })
    }

    componentDidUpdate = () => {
        API.getBeers()
            .then(response => {
                if (!response) return
                this.setState({
                    data: {
                        personal: {
                            beers: response
                        }
                    }
                })
            })
    }

    handleLogout = () => {
        API.logoutUser()
            .then(this.setState({ auth: { loggedOut: true } }))
    }


    render() {
        if (this.state.auth.isAuthenticated === false) return ("Error 401 Unauthorized: Please log in to view this resource.")
        if (this.state.auth.loggedOut === true) return <Redirect to="/login" />

        return (
            <div>
                <NavFix
                    name={this.state.auth.name}
                    logoutHandler={this.handleLogout}
                    navClickHandler={this.navigationToggle} />
                {this.state.ui.display === "Home" ? <Home
                    beerCounter={this.state.data.personal.beers.length}
                    viewAllHandler={this.navigationToggle}
                    addLinkHandler={this.navigationToggle} /> : ""}
                {this.state.ui.display === "Search Beers" ? <Search /> : ""}
                {this.state.ui.display === "My Beers" ? <PersonalBeers beerData={this.state.data.personal.beers} /> : ""}
                {this.state.ui.display === "Add a Beer" ? <CreateBeer /> : ""}



            </div>

        )
    }
}

export default Dashboard