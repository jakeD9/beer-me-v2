import React, { Component } from 'react';
import API from '../../utils/API';
import { Redirect } from 'react-router-dom'
import NavFix from '../../components/NavFix/NavFix';
import Search from '../../components/Search/Search';


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
            home: true,
            search: false,
            list: false,
            news: false,
            report: false,
            settings: false
        },
        data: {
            personal: {
                beers: []
            },
            search: {
                news: [],
            }
        }
    };

    componentWillMount = () => {
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
            })
        
    }

    componentDidMount = () => {
        // API.getBeers(this.state.auth.mId)
        //     .then(response => {
        //         if (!response) return
        //         this.setState({
        //             data: {
        //                 personal: {
        //                     beers: response
        //                 }
        //             }
        //         })
        //         console.log(this.state.data.personal.beers)
        //     })



        // const beer = {
        //     name: "Unfiltered Wheat",
        //     brewery: "Boulevard Brewery",
        //     abv: 4.5,
        //     type: "Wheat",
        //     location: "Kansas City, MO"
        // }

        // API.addBeer(beer)
        //     .then(response => {
        //         console.log(response)
        //     })

        // API.deleteBeer("5d5f0ef9c557d3e60cff134b")
        //     .then(response => {
        //         if (!response) return
        //         console.log(response)
        //     })

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
                    logoutHandler={this.handleLogout} />
                <Search 
                    />
            </div>

        )
    }
}

export default Dashboard