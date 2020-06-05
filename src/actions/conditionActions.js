// Duncan Echols-Jones
// 4/3/2020
// Conditions actions for Redux

export const GET_CONDITIONS = "GET_CONDITIONS"
export const getConditionsDispatch = (actualConditions) => ({
    type: GET_CONDITIONS,
    conditions: actualConditions
})