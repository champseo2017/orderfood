import axios from "axios";
import { getWithExpiry } from "../../commonFunc/setwithexpirylocalstrage";
import {
  LOADUSERSLIST_PENDING,
  LOADUSERSLIST_SUCCESS,
  LOADUSERSLIST_REJECTED,
  LOADUSERSLIST_CLEAR
} from "./actionTypes";

const BASE_URL = process.env.ENDPOINT;
export const getUserList = () => {
  const jwtToken = getWithExpiry("token");
  return (dispatch) => {
    dispatch({ type: LOADUSERSLIST_PENDING });
    return axios({
      method: "get",
      url: `${BASE_URL}/api/getusers`,
      headers: {
        Authorization: jwtToken,
      },
    })
      .then((response) => {
        setTimeout(() => {
          dispatch({
            type: LOADUSERSLIST_SUCCESS,
            payload: response.data,
          });
        }, 1000);
      })
      .catch((error) => {
        if (error) {
          dispatch({ type: LOADUSERSLIST_REJECTED, payload: error });
        }
      });
  };
};

export const clearUserList = () => {
  return (dispatch) => {
    dispatch({ type: LOADUSERSLIST_CLEAR });
  }
}