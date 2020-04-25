import { ADD_PURCHASE, EDIT_PURCHASE, GET_PURCHASES, DELETE_PURCHASE, PURCHASE_ERROR } from './types';

import axios from 'axios';

// Get all purchases for current user
export const getPurchases = () => async dispatch => {
    try {
        let purchases = await axios.get('/api/purchases');

        dispatch({
            type: GET_PURCHASES,
            payload: purchases.data
        });
    } catch (err) {
        dispatch({
            type: PURCHASE_ERROR,
            payload: err
        });
    }
}

// Add Purchase
export const addPurchase = purchase => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await axios.post('/api/purchases', purchase, config);

        dispatch({
            type: ADD_PURCHASE,
            payload: purchase
        });
    } catch (err) {
        dispatch({
            type: PURCHASE_ERROR,
            payload: err
        });
    }
}