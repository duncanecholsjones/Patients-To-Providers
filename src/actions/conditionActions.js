// Duncan Echols-Jones
// 2/18/2021
// Conditions actions for Redux

export const GET_CONDITIONS = "GET_CONDITIONS"
export const getConditionsDispatch = (actualConditions) => ({
    type: GET_CONDITIONS,
    conditions: actualConditions
})