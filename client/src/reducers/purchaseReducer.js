import { ADD_PURCHASE, EDIT_PURCHASE, GET_PURCHASES, SET_COMPETITOR, GET_COMPETITOR_PURCHASES, DELETE_PURCHASE, PURCHASE_ERROR, CLEAR_PURCHASES, CLEAR_COMPETITOR } from '../actions/types';

const initialState = {
    purchases: [],
    competitor: null,
    competitorPurchases: [],
    error: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_PURCHASES:
            state.purchases = action.payload;
            return{
                ...state
            }
        case SET_COMPETITOR:
            return{
                ...state,
                competitor: action.payload
            }
        case GET_COMPETITOR_PURCHASES:
            state.competitorPurchases = action.payload;
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
        case PURCHASE_ERROR:
            console.error(action.payload);
            return{
                ...state,
                error: action.payload
            }
        case CLEAR_PURCHASES:
            return{
                ...state,
                purchases: [],
                competitor: null,
                competitorPurchases: []
            }
        case CLEAR_COMPETITOR:
            return{
                ...state,
                competitor: null,
                competitorPurchases: []
            }
        default:
            return state;
        
    }
}