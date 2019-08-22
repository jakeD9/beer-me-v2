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
    }

}

export default API;