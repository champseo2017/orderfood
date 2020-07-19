// clear data user
export const clearCreateUser = () => {
  return (dispatch) => {
    dispatch({ type: "CREATE_USERS_SUCCESS" });
  }
}