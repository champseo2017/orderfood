import axios from "axios";
import { getWithExpiry } from "../../commonFunc/setwithexpirylocalstrage";
const BASE_URL = process.env.ENDPOINT;
export const adminSignIn = (csrfToken) => {
  const jwtToken = getWithExpiry("token");
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${BASE_URL}/api/checkadminpages`,
      headers: {
        Authorization: jwtToken,
        "CSRF-Token": csrfToken,
      },
    })
      .then((response) => {
        const { message } = response.data;
        dispatch({
          type: "ADMINPAGES_SUCCESS",
          payload: message,
        });
      })
      .catch((error) => {
        if (error) {
          dispatch({
            type: "ADMINPAGES_REJECTED",
            payload: "Bad Login Info Admin",
          });
        }
      });
  };
};

export const clearAdminCheck = () => {
  return (dispatch) => {
    dispatch({ type: "ADMINPAGES_CLEAR" });
  };
};
