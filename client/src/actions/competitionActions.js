import { SEND_COMP, ACCEPT_COMP, REJECT_COMP, GET_ACCEPTED, GET_PENDING, COMP_ERROR } from './types';

import axios from 'axios';

// Send competition request
export const sendRequest = user2ID => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // api call to send request
        let res = await axios.post('/api/competitions/send', user2ID, config);

        dispatch({
            type: SEND_COMP,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMP_ERROR,
            payload: err
        });
    }
}

// Get accepted competitions
export const getAccepted = () => async dispatch => {
    try {
        let competitions = await axios.get('/api/competitions/accepted');

        dispatch({
            type: GET_ACCEPTED,
            payload: competitions.data
        })
    } catch (err) {
        dispatch({
            type: COMP_ERROR,
            payload: err
        });
    }
}

// Get pending competitions
export const getPending = () => async dispatch => {
    try {
        let competitions = await axios.get('/api/competitions/pending');
        console.log(competitions);
        dispatch({
            type: GET_PENDING,
            payload: competitions.data
        })
    } catch (err) {
        dispatch({
            type: COMP_ERROR,
            payload: err
        });
    }
}

// Accept competition request


// Reject competition request


