import { LOGIN, GET_USER, LOGOUT, DELETE_USER, AUTH_ERROR, USER_ERROR, SEND_FRIEND, ACCEPT_FRIEND, FRIEND_ERROR, DELETE_FRIEND } from '../actions/types';

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
                isLoggedIn: true
            }
        case GET_USER:
            return{
                ...state,
                user: action.payload
            };
        case LOGOUT:
        case DELETE_USER:
            return{
                ...state,
                user:null,
                isLoggedIn: false
            }
        case SEND_FRIEND:
            return{
                ...state,
                user: action.payload
            }
        case ACCEPT_FRIEND:
            state.user.friends = state.user.friends.map(friend => friend._id === action.payload._id ? 
                action.payload : friend)
            return{
                ...state,
            }
        case DELETE_FRIEND:
            state.user.friends = state.user.friends.filter(friend => friend.user1 !== action.payload);
            state.user.friends = state.user.friends.filter(friend => friend.user2 !== action.payload);
            return{
                ...state
            }
        case AUTH_ERROR:
        case USER_ERROR:
        case FRIEND_ERROR:
            console.error(action.payload);
            return{
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}