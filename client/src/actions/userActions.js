import { GET_USER, LOGOUT } from './types';

import axios from 'axios';

// Get logged in user
export const getUser = () => async dispatch => {
    try {
        // api call to log in to facebook
        const res = await axios.get('/api/users/current');
        console.log(res.data);

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
        dispatch({
            type: LOGOUT,
            payload: null
        })
    } catch (err) {
        console.log(err);   
    }
}