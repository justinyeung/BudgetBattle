import { ADD_PURCHASE, EDIT_PURCHASE, GET_PURCHASES, DELETE_PURCHASE, PURCHASE_ERROR, CLEAR_PURCHASES } from '../actions/types';

const initialState = {
    purchases: [],
    error: null
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
            // state.purchases = action.payload;
            return{
                ...state
            }
        case DELETE_PURCHASE:
            state.purchases = state.purchases.filter(purchase => purchase._id !== action.payload)
            return{
                ...state
            }
        case PURCHASE_ERROR:
            console.error(action.payload);
            return{
                ...state,
                error: action.payload
            }
        case CLEAR_PURCHASES:
            return{
                ...state,
                purchases: []
            }
        default:
            return state;
        
    }
}