import { combineReducers } from 'redux';
import authReducers from './authReducers'
import checkAdminReducers from './checkAdminReducers'
import dashboardReducers from './dashboardReducers'

const rootReducer = combineReducers({
    authReducers,
    checkAdminReducers,
    dashboardReducers
});

export default rootReducer;