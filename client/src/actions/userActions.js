import { LOGIN, GET_USER, LOGOUT, DELETEUSER, LOGIN_ERROR, GET_USER_ERROR, 
    LOGOUT_ERROR, DELETE_USER_ERROR, ADD_FRIEND, ADD_FRIEND_ERROR } from './types';

import axios from 'axios';

// Login user
// TODO trigger this in fb/gg login tags
export const login = () => async dispatch => {
    try {
        // api call to get current user
        const res = await axios.get('/api/users/current');

        dispatch({
            type: LOGIN,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: LOGIN_ERROR,
            payload: err
        });
    }
}

// Get logged in user
export const getUser = () => async dispatch => {
    try {
        // api call to get current user
        const res = await axios.get('/api/users/current');

        dispatch({
            type: GET_USER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_USER_ERROR,
            payload: err
        });
    }
}

// logout user
export const logout = () => async dispatch => {
    try {
        // api call to log out user
        await axios.get('/api/users/logout');

        dispatch({
            type: LOGOUT,
            payload: null
        })
    } catch (err) {
        dispatch({
            type: LOGOUT_ERROR,
            payload: err
        });
    }
}

// delete user
export const deleteUser = () => async dispatch => {
    try {
        // api call to delete user
        await axios.delete('/api/users/delete');

        dispatch({
            type: DELETEUSER,
            payload: null
        })
    } catch (err) {
        dispatch({
            type: DELETE_USER_ERROR,
            payload: err
        });
    }
}

// Add friend to current user
export const addFriend = (friendID) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const param = { friendID };

        // api call to add friend, friendID as param
        await axios.post('/api/friends/add', param, config);

        dispatch({
            type: ADD_FRIEND,
            payload: friendID
        })
    } catch (err) {
        dispatch({
            type: ADD_FRIEND_ERROR,
            payload: err
        });
        console.log(err);
    }
}