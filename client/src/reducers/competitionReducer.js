import { SEND_COMP, ACCEPT_COMP, REJECT_DELETE_COMP, GET_ACCEPTED, GET_PENDING, CLEAR_COMPS } from '../actions/types';

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
        case ACCEPT_COMP:
            return{
                ...state,
                accepted: [...state.accepted, action.payload],
                pending: state.pending.filter(comp => comp._id !== action.payload._id)
            }
        case REJECT_DELETE_COMP:
            console.log(action.payload);
            return{
                ...state,
                accepted: state.pending.filter(comp => comp._id !== action.payload.compID),
                pending: state.pending.filter(comp => comp._id !== action.payload.compID)
            }
        case CLEAR_COMPS:
            return{
                ...state,
                accepted: [],
                pending: []
            }
        default:
            return state;
    }
}