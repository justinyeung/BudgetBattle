import { GET_USER, LOGOUT } from '../actions/types';

const initialState = {
    user: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_USER:
            return{
                ...state,
                user: action.payload
            };
        case LOGOUT:
            return{
                ...state,
                user: null
            }
        default:
            return state;
    }
}