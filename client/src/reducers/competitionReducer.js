import { SEND_COMP, ACCEPT_COMP, REJECT_COMP, GET_ACCEPTED, GET_PENDING } from '../actions/types';

const initialState = {
    accepted: [],
    pending: [],
    error: null
}

export default(state = initialState, action) => {
    switch(action.type){
        case SEND_COMP:
            state.pending = [...state.pending, action.payload]
            return{
                ...state
            }
        case GET_ACCEPTED:
            state.accepted = action.payload
            return{
                ...state
            }
        case GET_PENDING:
            state.pending = action.payload
            return{
                ...state
            }
        default:
            return state;
    }
}