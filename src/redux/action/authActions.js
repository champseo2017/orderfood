import axios from "axios";
import { setWithExpiry } from "../../commonFunc/setwithexpirylocalstrage";
const BASE_URL = process.env.ENDPOINT;

export const signin = (email, password, csrfToken) => {
  return (dispatch) => {
    dispatch({ type: "LOGINADMIN_PENDING" });
    return axios({
      method: "post",
      url: `${BASE_URL}/api/adminlogin`,
      headers: {
        "CSRF-Token": csrfToken,
      },
      data: {
        user_email: email,
        user_password: password,
      },
    })
      .then((response) => {
        const { token } = response.data;
        // Get milliseconds at current time plus number of hours * 60 minutes * 60 seconds * 1000 milliseconds
        setWithExpiry("token", token, 86400000);
        setTimeout(() => {
          dispatch({
            type: "LOGINADMIN_SUCCESS",
            payload: token,
          });
        }, 1500);
      })
      .catch((error) => {
        if (error) {
          dispatch({ type: "LOGINADMIN_REJECTED", payload: "Bad Login Info" });
        }
      });
  };
};
