import { combineReducers } from 'redux';
import authReducers from './authReducers'
import checkAdminReducers from './checkAdminReducers'
import dashboardReducers from './dashboardReducers'
import dashboardGetUsersReducers from './dashboardGetUsersReducers'
import addUserAdminReducers from './addUserAdminReducers'
const rootReducer = combineReducers({
    authReducers,
    checkAdminReducers,
    dashboardReducers,
    dashboardGetUsersReducers,
    addUserAdminReducers
});

export default rootReducer;