const createUser = (user) =>
    fetch(`http://localhost:8181/api/users`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

const getLoggedInUser = () =>
    fetch(`http://localhost:8181/api/currentUser`, {
        method: 'POST',
        credentials: "include"
    }).then(response => response.json())

const login = (userCredentials) =>
    fetch(`http://localhost:8181/api/login`, {
        method: 'POST',
        body: JSON.stringify(userCredentials),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

const logout = () =>
    fetch(`http://localhost:8181/api/logout`, {
        method: 'POST',
        credentials: 'include'
    }).then(response => response)

export default {
    createUser,
    getLoggedInUser,
    login,
    logout
}