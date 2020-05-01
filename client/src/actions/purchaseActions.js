import { ADD_PURCHASE, EDIT_PURCHASE, GET_PURCHASES, DELETE_PURCHASE, PURCHASE_ERROR, CLEAR_PURCHASES } from './types';

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

        // api call to add purchase to db
        let res = await axios.post('/api/purchases', purchase, config);

        // api call to get purchase to retrieve userid and purchaseid
        // let purchases = await axios.get('/api/purchases');

        dispatch({
            type: ADD_PURCHASE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PURCHASE_ERROR,
            payload: err
        });
    }
}

// Delete a purchase
export const deletePurchase = purchaseID => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }, 
            data: {
                'purchaseID': purchaseID
            }
        } 

        await axios.delete('/api/purchases', config);

        dispatch({
            type: DELETE_PURCHASE,
            payload: purchaseID
        })
    } catch (err) {
        dispatch({
            type: PURCHASE_ERROR,
            payload: err
        });
    }
}

// Clear purchases fro state
export const clearPurchases = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_PURCHASES,
            payload: null
        })
    } catch (err) {
        dispatch({
            type: PURCHASE_ERROR,
            payload: err
        });
    }
}