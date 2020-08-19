import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
const BASE_URL = process.env.ENDPOINT;
export const adminSignIn = (csrfToken) => {
  const jwtToken = reactLocalStorage.get("token");
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
          dispatch({ type: "ADMINPAGES_REJECTED", payload: "Bad Login Info Admin" });
        }
      });
  };
};
