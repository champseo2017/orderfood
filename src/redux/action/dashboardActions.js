export const clickDashboardUser = () => {
    return (dispatch) => {
      dispatch({ type: "USERCLICK_DASHBOARDUSER" });
    }
}

export const clearDashboardUser = () => {
    return (dispatch) => {
      dispatch({ type: "CLEAR_DASHBOARDUSER" });
    }
}