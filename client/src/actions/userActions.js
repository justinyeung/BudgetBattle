import { LOGIN, GET_USER, LOGOUT, DELETEUSER } from './types';

import axios from 'axios';

// Login user
export const login = () => async dispatch => {
    try {
        // api call to get current user
        const res = await axios.get('/api/users/current');

        dispatch({
            type: LOGIN,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
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
        console.log(err);
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
        console.log(err);   
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
        
    }
}