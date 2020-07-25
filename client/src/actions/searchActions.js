/**
 * @module searchActions
 */

import { SEARCH_USER, SEARCH_ERROR, SET_SEARCH_LOADING } from './types';
import axios from 'axios';

/**
 * Searches users for regex matches.
 * Dispatch results to search store.
 *
 * @async
 * @public
 * @static
 * @function searchUsers
 * @param {string} config.friendSearch - name of search query
 */
export const searchUsers = ({ friendSearch }) => async (dispatch) => {
    try {
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

/**
 * Set and disptach search loading flag.
 * Dispatch results to search store.
 *
 * @async
 * @static
 * @public
 * @function setSearchLoading
 */
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
