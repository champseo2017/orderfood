import { combineReducers } from 'redux';
import authReducers from './authReducers'
import checkAdminReducers from './checkAdminReducers'

const rootReducer = combineReducers({
    authReducers,
    checkAdminReducers
});

export default rootReducer;