import { SAVEUSERSSUCESS, SAVEUSERSTIMEOUT } from "../actionTypes.js";
export const saveUserSuccess = () => {
  return (dispatch) => {
    dispatch({ type: SAVEUSERSSUCESS });
  };
};

export const saveUserTimeOut = () => {
  return (dispatch) => {
    dispatch({ type: SAVEUSERSTIMEOUT });
  };
};