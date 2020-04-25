import { LOGIN, GET_USER, LOGOUT, DELETEUSER, LOGIN_ERROR, GET_USER_ERROR, 
    LOGOUT_ERROR, DELETE_USER_ERROR, ADD_FRIEND, ADD_FRIEND_ERROR } from '../actions/types';

const initialState = {
    user: null,
    isLoggedIn: false,
    error: null
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
        case ADD_FRIEND:
            state.user.friends = [...state.user.friends, action.payload];
            // console.log(state.user);
            return{
                ...state
            }
        case LOGIN_ERROR:
        case GET_USER_ERROR:
        case LOGOUT_ERROR:
        case DELETE_USER_ERROR:
        case ADD_FRIEND_ERROR:
            console.error(action.payload);
            return{
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}