import { combineReducers } from 'redux';
import userReducer from './userReducer';
import purchaseReducer from './purchaseReducer';

export default combineReducers({
    user: userReducer,
    purchase: purchaseReducer
});