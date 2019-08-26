const API = {
    registerUser: (credentials) => {
        console.log(credentials);
        return fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    },

    loginUser: (credentials) => {
        console.log(credentials);
        return fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(res => res)
            .catch(err => console.log(err))
    },

    verifyUser: () => {
        return fetch('/auth/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    },

    logoutUser: () => {
        return fetch('/auth/logout', {
            method: 'GET',
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    },

    searchBeers: (query) => {
        // hit our opendb url and database
        return fetch(`/api/searchbeers/${query}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    },

    getBeers: () => {
        return fetch('/api/getbeers', {
            method: 'GET',
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    },

    createBeer: (beer) => {
        let beerData = beer
        beerData.abv = parseFloat(beerData.abv)
        return fetch('/api/createbeer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(beerData)
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    },

    addBeer: (beer) => {
        let beerData = beer
        if (beerData.source === "OpenBeerDB") {
            if (beerData.abv === "No ABV found") beerData.abv = 0
            delete beerData._id
        }
        return fetch('/api/addbeer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(beerData)
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    },

    deleteBeer: (beerId) => {
        return fetch('/api/removebeer/' + beerId, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    }

}

export default API;