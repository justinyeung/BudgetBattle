import { LOGIN, GET_USER, LOGOUT, DELETEUSER } from '../actions/types';

const initialState = {
    user: null,
    isLoggedIn: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return{
                ...state,
                user: action.payload,
                isLoggedIn: true
            }
        case GET_USER:
            return{
                ...state,
                user: action.payload
            };
        case LOGOUT:
        case DELETEUSER:
            return{
                ...state,
                user:null,
                isLoggedIn: false
            }
        default:
            return state;
    }
}