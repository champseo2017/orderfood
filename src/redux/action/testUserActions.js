// clear data user
export const clearCreateUser = () => {
  return (dispatch) => {
    dispatch({ type: "CREATE_USERS_SUCCESS" });
  }
}

// clear data user
export const clearCreateUser2 = () => {
  return (dispatch) => {
    dispatch({ type: "CLEARDATA_USERS" });
  }
}