import {
    SEND_COMP,
    ACCEPT_COMP,
    REJECT_DELETE_COMP,
    GET_ACCEPTED_COMP,
    GET_OUTPENDING_COMP,
    GET_INPENDING_COMP,
    CLEAR_COMPS,
    SET_COMPETITION,
    SET_COMPETITOR,
    GET_COMPETITOR_PURCHASES,
    CLEAR_COMPETITOR,
    SET_COMP_LOADING,
    SET_COMP_LOADING_FALSE,
} from '../actions/types';

const initialState = {
    accepted: [],
    outpending: [],
    inpending: [],
    competition: null,
    competitor: null,
    competitorPurchases: [],
    compLoading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_COMP_LOADING:
            return {
                ...state,
                compLoading: true,
            };
        case SET_COMP_LOADING_FALSE:
            return {
                ...state,
                compLoading: false,
            };
        case SET_COMPETITION:
            return {
                ...state,
                competition: action.payload,
                compLoading: false,
            };
        case SET_COMPETITOR:
            return {
                ...state,
                competitor: action.payload,
                compLoading: false,
            };
        case GET_COMPETITOR_PURCHASES:
            state.competitorPurchases = action.payload;
            return {
                ...state,
                compLoading: false,
            };
        case CLEAR_COMPETITOR:
            return {
                ...state,
                competitor: null,
                competitorPurchases: [],
                compLoading: false,
            };
        case SEND_COMP:
            state.outpending = [...state.outpending, action.payload];
            return {
                ...state,
                compLoading: false,
            };
        case GET_ACCEPTED_COMP:
            state.accepted = action.payload;
            return {
                ...state,
                compLoading: false,
            };
        case GET_OUTPENDING_COMP:
            state.outpending = action.payload;
            return {
                ...state,
                compLoading: false,
            };
        case GET_INPENDING_COMP:
            state.inpending = action.payload;
            return {
                ...state,
                compLoading: false,
            };
        case ACCEPT_COMP:
            return {
                ...state,
                accepted: [...state.accepted, action.payload],
                inpending: state.inpending.filter(
                    (comp) => comp._id !== action.payload._id
                ),
                compLoading: false,
            };
        case REJECT_DELETE_COMP:
            return {
                ...state,
                accepted: state.accepted.filter(
                    (comp) => comp._id !== action.payload.compID
                ),
                outpending: state.outpending.filter(
                    (comp) => comp._id !== action.payload.compID
                ),
                inpending: state.inpending.filter(
                    (comp) => comp._id !== action.payload.compID
                ),
                compLoading: false,
            };
        case CLEAR_COMPS:
            return {
                ...state,
                accepted: [],
                outpending: [],
                inpending: [],
                compLoading: false,
            };
        default:
            return state;
    }
};
