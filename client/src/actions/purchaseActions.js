/**
 * @module purchaseActions
 */

import {
    ADD_PURCHASE,
    EDIT_PURCHASE,
    GET_PURCHASES,
    DELETE_PURCHASE,
    PURCHASE_ERROR,
    SET_PURCHASE_LOADING,
    SET_PURCHASE_LOADING_FALSE,
} from './types';
import { isLoggedIn } from './middleware';
import axios from 'axios';

/**
 * GET request to get user's purchases.
 * Dispatches to the purchases store.
 *
 * @async
 * @public
 * @static
 * @function getPurchases
 */
export const getPurchases = () => async (dispatch) => {
    try {
        let res = await axios.get('/api/purchases');

        if (!isLoggedIn(res.data)) {
            dispatch({
                type: SET_PURCHASE_LOADING_FALSE,
                payload: null,
            });
        } else {
            dispatch({
                type: GET_PURCHASES,
                payload: res.data,
            });
        }
    } catch (err) {
        dispatch({
            type: PURCHASE_ERROR,
            payload: err,
        });
    }
};

/**
 * POST request to add a purchases.
 * Dispatches to the purchases store.
 *
 * @async
 * @public
 * @static
 * @function addPurchase
 * @param {Object} purchase - purchase object
 */
export const addPurchase = (purchase) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // api call to add purchase to db
        let res = await axios.post('/api/purchases', purchase, config);

        if (!isLoggedIn(res.data)) {
            dispatch({
                type: SET_PURCHASE_LOADING_FALSE,
                payload: null,
            });
        } else {
            dispatch({
                type: ADD_PURCHASE,
                payload: res.data,
            });
        }
    } catch (err) {
        dispatch({
            type: PURCHASE_ERROR,
            payload: err,
        });
    }
};

/**
 * PUT request to edit a purchases.
 * Dispatches to the purchases store.
 *
 * @async
 * @public
 * @static
 * @function editPurchase
 * @param {Object} purchase - purchase object
 */
export const editPurchase = (purchase) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.put('/api/purchases/', purchase, config);

        if (!isLoggedIn(res.data)) {
            dispatch({
                type: SET_PURCHASE_LOADING_FALSE,
                payload: null,
            });
        } else {
            dispatch({
                type: EDIT_PURCHASE,
                payload: res.data,
            });
        }
    } catch (err) {
        dispatch({
            type: PURCHASE_ERROR,
            payload: err,
        });
    }
};

/**
 * DELETE request to delete a purchases.
 * Dispatches to the purchases store.
 *
 * @async
 * @public
 * @static
 * @function deletePurchase
 * @param {number} purchaseID - purchase ID
 */
export const deletePurchase = (purchaseID) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                purchaseID: purchaseID,
            },
        };

        await axios.delete('/api/purchases', config);

        dispatch({
            type: DELETE_PURCHASE,
            payload: purchaseID,
        });
    } catch (err) {
        dispatch({
            type: PURCHASE_ERROR,
            payload: err,
        });
    }
};

/**
 * Set and disptach purchase loading flag.
 * Dispatches to the purchases store.
 *
 * @async
 * @static
 * @public
 * @function setPurchaseLoading
 */
export const setPurchaseLoading = () => async (dispatch) => {
    try {
        dispatch({
            type: SET_PURCHASE_LOADING,
            payload: null,
        });
    } catch (err) {
        dispatch({
            type: PURCHASE_ERROR,
            payload: err,
        });
    }
};
