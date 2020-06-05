// Duncan Echols-Jones
// 4/3/2020
// User actions for Redux

export const LOG_IN_USER = "LOG_IN_USER"
export const logInUserDispatch = (user) => ({
    type: LOG_IN_USER,
    loggedInUser: user
})