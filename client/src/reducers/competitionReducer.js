import { SEND_COMP, ACCEPT_COMP, REJECT_DELETE_COMP, GET_ACCEPTED, GET_OUTPENDING, GET_INPENDING, CLEAR_COMPS } from '../actions/types';

const initialState = {
    accepted: [],
    outpending: [],
    inpending: [],
    error: null
}

export default(state = initialState, action) => {
    switch(action.type){
        case SEND_COMP:
            state.outpending = [...state.outpending, action.payload]
            return{
                ...state
            }
        case GET_ACCEPTED:
            state.accepted = action.payload
            return{
                ...state
            }
        case GET_OUTPENDING:
            state.outpending = action.payload
            return{
                ...state
            }
        case GET_INPENDING:
            state.inpending = action.payload
            return{
                ...state
            }
        case ACCEPT_COMP:
            return{
                ...state,
                accepted: [...state.accepted, action.payload],
                inpending: state.inpending.filter(comp => comp._id !== action.payload._id)
            }
        case REJECT_DELETE_COMP:
            console.log(action.payload);
            return{
                ...state,
                accepted: state.outpending.filter(comp => comp._id !== action.payload.compID),
                outpending: state.outpending.filter(comp => comp._id !== action.payload.compID),
                inpending: state.inpending.filter(comp => comp._id !== action.payload.compID)
            }
        case CLEAR_COMPS:
            return{
                ...state,
                accepted: [],
                outpending: [],
                inpending: [],
            }
        default:
            return state;
    }
}