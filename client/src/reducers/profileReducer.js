import {
    GET_USER_BY_ID,
    GET_NUM_PURCHASES_BY_USERID,
    GET_NUM_COMPS_BY_USERID,
    SET_PROFILE_LOADING,
    SET_PROFILE_LOADING_FALSE,
    PROFILE_ERROR,
} from '../actions/types';

const initialState = {
    user: null,
    numFriends: 0,
    numPurchases: 0,
    numCompetitions: 0,
    profileLoading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_BY_ID:
            return {
                ...state,
                user: action.payload,
                numFriends:
                    action.payload && action.payload.friends
                        ? action.payload.friends.length
                        : 0,
                profileLoading: false,
            };
        case GET_NUM_COMPS_BY_USERID:
            return {
                ...state,
                numCompetitions:
                    action.payload &&
                    action.payload.filter((val) => val.status === 'Accepted')
                        .length,
                profileLoading: false,
            };
        case GET_NUM_PURCHASES_BY_USERID:
            return {
                ...state,
                numPurchases: action.payload,
                profileLoading: false,
            };
        case SET_PROFILE_LOADING:
            return {
                ...state,
                profileLoading: true,
            };
        case SET_PROFILE_LOADING_FALSE:
            return {
                ...state,
                profileLoading: false,
            };
        case PROFILE_ERROR:
            console.error(action.payload);
            return {
                ...state,
                error: action.payload,
                profileLoading: false,
            };
        default:
            return state;
    }
};
