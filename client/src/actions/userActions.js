import { GET_USER } from './types';

import axios from 'axios';

// Get logged in user
export const getUser = () => async dispatch => {
    try {
        // api call to log in to facebook
        const res = await axios.get('/api/fbauth/user');

        dispatch({
            type: GET_USER,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}