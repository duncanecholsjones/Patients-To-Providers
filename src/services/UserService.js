// Duncan Echols-Jones
// 4/3/2020
// REST API endoint for Users

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

const getOtherUserProfile = (otherUserId) =>
    fetch(`http://localhost:8181/api/otherUser/${otherUserId}`, {
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
    }).then(function (response) {
        return response.json()
    }).catch(function (error) {
        console.log("Failed!", error);
    })

const logout = () =>
    fetch(`http://localhost:8181/api/logout`, {
        method: 'POST',
        credentials: 'include'
    }).then(response => response)

const addConditionForUser = (condition) =>
    fetch(`http://localhost:8181/api/user/conditions`, {
        method: 'POST',
        body: JSON.stringify(condition),
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    }).then(response => response.json())

const updateUser = (userId, newUser) =>
    fetch(`http://localhost:8181/api/user/${userId}/update`, {
        method: 'PUT',
        body: JSON.stringify(newUser),
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    }).then(response => response.json())

const deleteUser = (userId) =>
    fetch(`http://localhost:8181/api/user/${userId}/delete`, {
        method: 'DELETE',
        credentials: "include"
    }).then(response => response)

const getOtherUsersWithCondition = () =>
    fetch(`http://localhost:8181/api/user/conditions/getOthers`, {
        method: 'GET',
        credentials: 'include'
    }).then(response => response.json())

export default {
    createUser,
    getLoggedInUser,
    getOtherUserProfile,
    login,
    logout,
    addConditionForUser,
    updateUser,
    deleteUser,
    getOtherUsersWithCondition
}