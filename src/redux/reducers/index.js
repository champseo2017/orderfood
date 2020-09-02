import { combineReducers } from 'redux';
import authReducers from './authReducers'
import checkAdminReducers from './checkAdminReducers'
import dashboardReducers from './dashboardReducers'
import dashboardGetUsersReducers from './dashboardGetUsersReducers'

const rootReducer = combineReducers({
    authReducers,
    checkAdminReducers,
    dashboardReducers,
    dashboardGetUsersReducers
});

export default rootReducer;