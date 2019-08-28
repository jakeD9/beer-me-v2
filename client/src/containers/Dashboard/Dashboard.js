import React, { Component } from 'react';
import API from '../../utils/API';
import { Redirect } from 'react-router-dom'
import NavFix from '../../components/NavFix/NavFix';
import Search from '../../components/Search/Search';
import Home from '../../containers/Home/Home';
import CreateBeer from '../CreateBeer/CreateBeer';
import PersonalBeers from '../PersonalBeers/PersonalBeers'


class Dashboard extends Component {
    state = {
        auth: {
            loggedOut: false,
            isAuthenticated: false,
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

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.data.personal.beers.length !== this.state.data.personal.beers.length) {
            return API.getBeers()
                .then(response => {
                    this.setState({
                        data: {
                            personal: {
                                beers: response
                            }
                        }
                    })
                })
        } else return
    }

    refreshBeers = () => {
        API.getBeers()
            .then(response => {
                this.setState({
                    data: { personal: { beers: response } }
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
                {this.state.ui.display === "Search Beers" ? <Search refreshHandler={this.refreshBeers}/> : ""}
                {this.state.ui.display === "My Beers" ? <PersonalBeers beerData={this.state.data.personal.beers} refreshHandler={this.refreshBeers}/> : ""}
                {this.state.ui.display === "Add a Beer" ? <CreateBeer refreshHandler={this.refreshBeers}/> : ""}
            </div>

        )
    }
}

export default Dashboard