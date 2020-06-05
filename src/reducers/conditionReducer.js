// Duncan Echols-Jones
// 4/3/2020
// Redux reducer for conditions

import {GET_CONDITIONS} from '../actions/conditionActions'

const initialState = {
    conditions: null
}

const conditionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONDITIONS:
            return {
                conditions: action.conditions
            }
        default:
            return state
    }

}

export default conditionReducer