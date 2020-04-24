import { GET_USER } from './types';

import axios from 'axios';

// Get logged in user
export const getUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/auth/login/facebook');
        const data = await res.json();

        dispatch({
            type: GET_USER,
            payload: data
        })
    } catch (err) {
        console.log(err)
        ;
    }
}