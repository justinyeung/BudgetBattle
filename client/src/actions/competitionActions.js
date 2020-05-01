import { SEND_COMP, ACCEPT_COMP, REJECT_COMP, GET_ACCEPTED, GET_PENDING, COMP_ERROR, CLEAR_COMPS } from './types';

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
export const getAcceptedComp = () => async dispatch => {
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
export const getPendingComp = () => async dispatch => {
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
export const acceptComp = compID => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let competition = await axios.put('/api/competitions/accept', compID, config);

        dispatch({
            type: ACCEPT_COMP,
            payload: competition.data
        })
    } catch (err) {
        dispatch({
            type: COMP_ERROR,
            payload: err
        });
    }
}

// Reject competition request
export const rejectComp = comp => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }, 
            data: {
                'comp': comp
            }
        }

        await axios.delete('/api/competitions/reject', config);

        dispatch({
            type: REJECT_COMP,
            payload: comp
        })
    } catch (err) {
        dispatch({
            type: COMP_ERROR,
            payload: err
        });
    }
}

// Clear competitions from state
export const clearComps = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_COMPS,
            payload: null
        })
    } catch (err) {
        dispatch({
            type: COMP_ERROR,
            payload: err
        });
    }
}

