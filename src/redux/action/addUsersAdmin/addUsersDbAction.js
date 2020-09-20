import {
  INSERTUSERADMINDB_PENDING,
  INSERTUSERADMINDB_SUCCESS,
  INSERTUSERADMINDB_REJECTED,
  CLEARINSERTUSER_DB,
} from "../actionTypes.js";
import axios from "axios";
import { getWithExpiry } from "../../../commonFunc/setwithexpirylocalstrage";
const BASE_URL = process.env.ENDPOINT;
const jwtToken = getWithExpiry("token");
export const addUserAdmin = ({ ...data }) => {
  return (dispatch) => {
    dispatch({ type: INSERTUSERADMINDB_PENDING });
    return axios({
      method: "post",
      url: `${BASE_URL}/api/addusers`,
      headers: {
        Authorization: jwtToken,
        "CSRF-Token": data.csrf,
      },
      data: {
        user_name: data.user_name,
        user_password: data.user_password,
        user_role: data.user_role,
        user_email: data.user_email,
      },
    })
      .then((response) => {
        const { data } = response;
        dispatch({
          type: INSERTUSERADMINDB_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        if (error) {
          dispatch({ type: INSERTUSERADMINDB_REJECTED, payload: error });
        }
      });
  };
};

export const clearAddUserAdmin = () => {
  return (dispatch) => {
    dispatch({ type: CLEARINSERTUSER_DB });
  }
}