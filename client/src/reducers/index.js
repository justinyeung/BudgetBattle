import { combineReducers } from 'redux';
import userReducer from './userReducer';
import purchaseReducer from './purchaseReducer';
import competitionReducer from './competitionReducer';
import searchReducer from './searchReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    user: userReducer,
    purchase: purchaseReducer,
    competition: competitionReducer,
    search: searchReducer,
    profile: profileReducer,
});
