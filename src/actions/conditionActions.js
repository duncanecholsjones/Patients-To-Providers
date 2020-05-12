export const GET_CONDITIONS = "GET_CONDITIONS"
export const getConditionsDispatch = (actualConditions) => ({
    type: GET_CONDITIONS,
    conditions: actualConditions
})