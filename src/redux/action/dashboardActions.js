import {
  ADDUSERCLICK_DASHBOARDUSER,
  CLEARADDUSER_DASHBOARDUSER,
} from "./actionTypes";
export const clickDashboardUser = () => {
    return (dispatch) => {
      dispatch({ type: "USERCLICK_DASHBOARDUSER" });
    }
}

export const clearDashboardUser = () => {
    return (dispatch) => {
      console.log('CLEAR_DASHBOARDUSER')
      dispatch({ type: "CLEAR_DASHBOARDUSER" });
    }
}

export const clickAddUserDashboardUser = () => {
  return (dispatch) => {
    dispatch({ type: ADDUSERCLICK_DASHBOARDUSER });
  }
}

export const clearAddUserDashboardUser = () => {
  return (dispatch) => {
    dispatch({ type: CLEARADDUSER_DASHBOARDUSER });
  }
}