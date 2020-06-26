import {
    GET_USER_BY_ID,
    GET_NUM_COMPS_BY_USERID,
    GET_NUM_PURCHASES_BY_USERID,
    PROFILE_ERROR,
    SET_PROFILE_LOADING,
    SET_PROFILE_LOADING_FALSE,
} from './types';

import axios from 'axios';

const isLoggedIn = (data) => {
    if (data.msg === 'no user') {
        return false;
    }
    return true;
};

export const getProfileUserById = ({ id }) => async (dispatch) => {
    try {
        // api call to get current user
        const res = await axios.get(`/api/users/byid/${id}`);

        dispatch({
            type: GET_USER_BY_ID,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err,
        });
    }
};

export const getNumCompsById = ({ id }) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/competitions/user/${id}`);

        if (!isLoggedIn(res.data)) {
            dispatch({
                type: SET_PROFILE_LOADING_FALSE,
                payload: null,
            });
        } else {
            dispatch({
                type: GET_NUM_COMPS_BY_USERID,
                payload: res.data,
            });
        }
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err,
        });
    }
};

export const getNumPurchasesById = ({ id }) => async (dispatch) => {
    try {
        // get purchase array by id
        const res = await axios.get(`/api/purchases/${id}`);
        if (!isLoggedIn(res.data)) {
            dispatch({
                type: SET_PROFILE_LOADING_FALSE,
                payload: null,
            });
        } else {
            dispatch({
                type: GET_NUM_PURCHASES_BY_USERID,
                payload: res.data.length,
            });
        }
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err,
        });
    }
};

// set loading
export const setProfileLoading = () => async (dispatch) => {
    try {
        dispatch({
            type: SET_PROFILE_LOADING,
            payload: null,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err,
        });
    }
};
