import {
    GET_USER,
    LOGOUT,
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

import axios from 'axios';

const isLoggedIn = (data) => {
    if (data.msg === 'no user') {
        return false;
    }
    return true;
};

// set loading
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

// Get current logged in user and user's friends
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
        console.log('Login failed');
        dispatch({
            type: USER_ERROR,
            payload: err,
        });
    }
};

// logout user
export const logout = () => async (dispatch) => {
    try {
        // api call to log out user
        await axios.get('/api/users/logout');

        dispatch({
            type: LOGOUT,
            payload: null,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: err,
        });
    }
};

// delete user
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

// Add friend to current user
export const sendFriendRequest = (friendID) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // api call to add friend, friendID as param
        // returns updated current user object
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
        console.log(err);
    }
};

// Accept friend request
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

// Delete friend for current user
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

        console.log(friendID);

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
        console.log(err);
    }
};
