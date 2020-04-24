import { GET_USER } from './types';

import axios from 'axios';

// Get logged in user
export const getUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/fbauth/user');
        // const data = await res.json();
        console.log(res.data);

        dispatch({
            type: GET_USER,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
        ;
    }
}