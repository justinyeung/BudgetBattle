import {
    SEND_COMP,
    ACCEPT_COMP,
    REJECT_DELETE_COMP,
    GET_ACCEPTED_COMP,
    GET_OUTPENDING_COMP,
    GET_INPENDING_COMP,
    COMP_ERROR,
    SET_COMP_LOADING,
    SET_COMP_LOADING_FALSE,
    SET_COMPETITION,
    GET_USER1_PURCHASES,
    GET_USER2_PURCHASES,
} from './types';

import axios from 'axios';

const isLoggedIn = (data) => {
    if (data.msg === 'no user') {
        return false;
    }
    return true;
};

// Send competition request
export const sendCompRequest = ({ id, numMonth, numYear }) => async (
    dispatch
) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // api call to send request
        let res = await axios.post(
            '/api/competitions/send',
            { id, numMonth, numYear },
            config
        );

        if (!isLoggedIn(res.data)) {
            dispatch({
                type: SET_COMP_LOADING_FALSE,
                payload: null,
            });
        } else {
            dispatch({
                type: SEND_COMP,
                payload: res.data,
            });
        }
    } catch (err) {
        dispatch({
            type: COMP_ERROR,
            payload: err,
        });
    }
};

// get accepted competitions
export const getAcceptedComps = () => async (dispatch) => {
    try {
        // get accepted competitions
        const accepted = await axios.get('/api/competitions/accepted');

        if (!isLoggedIn(accepted.data)) {
            dispatch({
                type: SET_COMP_LOADING_FALSE,
                payload: null,
            });
        } else {
            let comps = [];
            let promises = [];

            // for each accepted competition, update
            for (let i = 0; i < accepted.data.length; i++) {
                let id = accepted.data[i]._id;
                promises.push(
                    axios.get(`/api/competitions/comp/${id}`).then((res) => {
                        comps.push(res.data);
                    })
                );
            }
            Promise.all(promises).then(() => {
                dispatch({
                    type: GET_ACCEPTED_COMP,
                    payload: comps,
                });
            });
        }
    } catch (err) {
        dispatch({
            type: COMP_ERROR,
            payload: err,
        });
    }
};

// Get out pending competitions
export const getOutPendingComp = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/competitions/outpending');

        if (!isLoggedIn(res.data)) {
            dispatch({
                type: SET_COMP_LOADING_FALSE,
                payload: null,
            });
        } else {
            dispatch({
                type: GET_OUTPENDING_COMP,
                payload: res.data,
            });
        }
    } catch (err) {
        dispatch({
            type: COMP_ERROR,
            payload: err,
        });
    }
};

// Get in pending competitions
export const getInPendingComp = () => async (dispatch) => {
    try {
        let res = await axios.get('/api/competitions/inpending');

        if (!isLoggedIn(res.data)) {
            dispatch({
                type: SET_COMP_LOADING_FALSE,
                payload: null,
            });
        } else {
            dispatch({
                type: GET_INPENDING_COMP,
                payload: res.data,
            });
        }
    } catch (err) {
        dispatch({
            type: COMP_ERROR,
            payload: err,
        });
    }
};

// Accept competition request
export const acceptComp = (compID) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.put('/api/competitions', compID, config);

        if (!isLoggedIn(res.data)) {
            dispatch({
                type: SET_COMP_LOADING_FALSE,
                payload: null,
            });
        } else {
            dispatch({
                type: ACCEPT_COMP,
                payload: res.data,
            });
        }
    } catch (err) {
        dispatch({
            type: COMP_ERROR,
            payload: err,
        });
    }
};

// Reject competition request
export const rejectOrDeleteComp = (comp) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                comp: comp,
            },
        };

        await axios.delete('/api/competitions', config);

        dispatch({
            type: REJECT_DELETE_COMP,
            payload: comp,
        });
    } catch (err) {
        dispatch({
            type: COMP_ERROR,
            payload: err,
        });
    }
};

// local functions
const loadCompData = (id) => {
    return async function (dispatch) {
        // current competition object
        const comp = await axios.get(`/api/competitions/comp/${id}`);
        dispatch(dispatchCompetition(comp));
        let competition = comp.data;

        // user's competitions
        const user1Purchases = await axios.get(
            `/api/competitions/purchases/${competition.user1}/${competition._id}`
        );
        dispatch(dispatchUser1(user1Purchases));

        // competitor's competitions
        const user2Purchases = await axios.get(
            `/api/competitions/purchases/${competition.user2}/${competition._id}`
        );
        dispatch(dispatchUser2(user2Purchases));
    };
};
const dispatchUser1 = (param) => {
    return {
        type: GET_USER1_PURCHASES,
        payload: param.data,
    };
};
const dispatchUser2 = (param) => {
    return {
        type: GET_USER2_PURCHASES,
        payload: param.data,
    };
};
const dispatchCompetition = (param) => {
    return {
        type: SET_COMPETITION,
        payload: param.data,
    };
};

export const getCompetition = ({ id }) => async (dispatch) => {
    try {
        dispatch(loadCompData(id));
    } catch (err) {
        dispatch({
            type: COMP_ERROR,
            payload: err,
        });
    }
};

// set loading
export const setCompLoading = () => async (dispatch) => {
    try {
        dispatch({
            type: SET_COMP_LOADING,
            payload: null,
        });
    } catch (err) {
        dispatch({
            type: COMP_ERROR,
            payload: err,
        });
    }
};
