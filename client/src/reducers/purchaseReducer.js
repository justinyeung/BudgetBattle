import { ADD_PURCHASE, EDIT_PURCHASE, GET_PURCHASES, DELETE_PURCHASE } from '../actions/types';

const initialState = {
    purchases: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_PURCHASES:
            state.purchases = action.payload;
            return{
                ...state
            }
        case ADD_PURCHASE:
            state.purchases = [...state.purchases, action.payload];
            return{
                ...state
            }
        case DELETE_PURCHASE:
            state.purchases = state.purchases.filter(purchase => purchase._id !== action.payload)
            return{
                ...state
            }
        default:
            return state;
    }
}