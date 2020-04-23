import { GET_USER } from './types';

export const getUser = () => async dispatch => {
    try {
        const res = await fetch('/api/auth/login/facebook');
        const data = await res.json();

        dispatch({
            type: GET_USER,
            payload: data
        })
    } catch (err) {
        console.err(err);
    }
}