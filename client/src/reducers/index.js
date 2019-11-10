import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import authReducer from './authReducer';

export default combineReducers({
    homes: homeReducer,
    auth: authReducer
})