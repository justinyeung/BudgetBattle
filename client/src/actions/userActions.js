/**
 * @module userActions
 */

import {
    GET_USER,
    CLEAR_USER,
    CLEAR_COMPS,
    CLEAR_PURCHASES,
    DELETE_USER,
    AUTH_ERROR,
    USER_ERROR,
    SEND_FRIEND,
    ACCEPT_FRIEND,
    DELETE_FRIEND,
    FRIEND_ERROR,
    SET_USER_LOADING,
    SET_USER_LOADING_FALSE,
} from './types';
import { isLoggedIn } from './middleware';
import axios from 'axios';

/**
 * GET request to get user.
 * Dispatches to the user store.
 *
 * @async
 * @public
 * @static
 * @function getUser
 */
export const getUser = () => async (dispatch) => {
    try {
        // api call to get current user
        const res = await axios.get('/api/users/current');

        if (!isLoggedIn(res.data)) {
            dispatch({
                type: SET_USER_LOADING_FALSE,
                payload: null,
            });
        } else {
            dispatch({
                type: GET_USER,
                payload: res.data,
            });
        }
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: err,
        });
    }
};

/**
 * GET request to log out a user.
 * Logs user out of passport and destroys express session
 *
 * @async
 * @public
 * @static
 * @function logout
 */
export const logout = () => async (dispatch) => {
    try {
        // api call to log out user
        await axios.get('/api/users/logout');

        dispatch(clearData());
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: err,
        });
    }
};

/**
 * Clear user, purchase and battle data from store.
 *
 * @async
 * @private
 * @static
 * @function clearData
 */
const clearData = () => {
    return async function (dispatch) {
        dispatch(dispatchClearUser());
        dispatch(dispatchClearPurchases());
        dispatch(dispatchClearComps());
    };
};

/**
 * Dispatches flag to clear user data.
 *
 * @async
 * @private
 * @static
 * @function dispatchClearUser
 */
const dispatchClearUser = () => {
    return {
        type: CLEAR_USER,
        payload: null,
    };
};

/**
 * Dispatches flag to clear purchase data.
 *
 * @async
 * @private
 * @static
 * @function dispatchClearPurchases
 */
const dispatchClearPurchases = () => {
    return {
        type: CLEAR_PURCHASES,
        payload: null,
    };
};

/**
 * Dispatches flag to clear battle data.
 *
 * @async
 * @private
 * @static
 * @function dispatchClearComps
 */
const dispatchClearComps = () => {
    return {
        type: CLEAR_COMPS,
        payload: null,
    };
};

/**
 * DELETE request to delete user.
 * Dispatches to the user store.
 *
 * @async
 * @public
 * @static
 * @function deleteUser
 */
export const deleteUser = () => async (dispatch) => {
    try {
        // api call to delete user
        await axios.delete('/api/users/delete');

        dispatch({
            type: DELETE_USER,
            payload: null,
        });
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: err,
        });
    }
};

/**
 * POST request to send a friend request to another user.
 * Dispatches to the user store.
 *
 * @async
 * @public
 * @static
 * @function sendFriendRequest
 * @param {number} friendID - user ID
 */
export const sendFriendRequest = (friendID) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.post('/api/friends/send', friendID, config);

        if (!isLoggedIn(res.data)) {
            dispatch({
                type: SET_USER_LOADING_FALSE,
                payload: null,
            });
        } else {
            dispatch({
                type: SEND_FRIEND,
                payload: res.data,
            });
        }
    } catch (err) {
        dispatch({
            type: FRIEND_ERROR,
            payload: err,
        });
    }
};

/**
 * PUT request to accept a friend request from another user.
 * Dispatches to the user store.
 *
 * @async
 * @public
 * @static
 * @function acceptFriend
 * @param {number} friendID - user ID
 */
export const acceptFriend = (friendID) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // returns updated friend object
        const res = await axios.put('/api/friends', friendID, config);

        if (!isLoggedIn(res.data)) {
            dispatch({
                type: SET_USER_LOADING_FALSE,
                payload: null,
            });
        } else {
            dispatch({
                type: ACCEPT_FRIEND,
                payload: res.data,
            });
        }
    } catch (err) {
        dispatch({
            type: FRIEND_ERROR,
            payload: err,
        });
    }
};

/**
 * DELETE request to delete a friend.
 * Dispatches to the user store.
 *
 * @async
 * @public
 * @static
 * @function deleteFriend
 * @param {number} friendID - user ID
 */
export const deleteFriend = (friendID) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                friendID: friendID,
            },
        };

        // api call to add friend, friendID as param
        await axios.delete('/api/friends', config);

        dispatch({
            type: DELETE_FRIEND,
            payload: friendID.friendID,
        });
    } catch (err) {
        dispatch({
            type: FRIEND_ERROR,
            payload: err,
        });
    }
};

/**
 * Set and disptach user loading flag.
 * Dispatches to the user store.
 *
 * @async
 * @static
 * @public
 * @function setUserLoading
 */
export const setUserLoading = () => async (dispatch) => {
    try {
        dispatch({
            type: SET_USER_LOADING,
            payload: null,
        });
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: err,
        });
    }
};
