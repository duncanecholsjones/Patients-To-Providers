// Duncan Echols-Jones
// 2/18/2021
// User actions for Redux

export const LOG_IN_USER = "LOG_IN_USER"
export const logInUserDispatch = (user) => ({
    type: LOG_IN_USER,
    loggedInUser: user
})