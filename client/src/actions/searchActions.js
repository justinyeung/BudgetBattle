import { SEARCH_USER, SEARCH_ERROR, SET_SEARCH_LOADING } from './types';
import axios from 'axios';

export const searchUsers = ({ friendSearch }) => async (dispatch) => {
    try {
        // api call to search user
        let res = await axios.get(`/api/search/${friendSearch}`);

        dispatch({
            type: SEARCH_USER,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: SEARCH_ERROR,
            payload: err,
        });
    }
};

// set loading
export const setSearchLoading = () => async (dispatch) => {
    try {
        dispatch({
            type: SET_SEARCH_LOADING,
            payload: null,
        });
    } catch (err) {
        dispatch({
            type: SEARCH_ERROR,
            payload: err,
        });
    }
};
