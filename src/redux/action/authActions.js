import axios from "axios";
import jwtDecode from "jwt-decode";
import { reactLocalStorage } from "reactjs-localstorage";

const BASE_URL = process.env.ENDPOINT;
export const signin = (email, password, csrfToken) => {
 
  return (dispatch) => {
    dispatch({ type: "LOGINADMIN_PENDING" });
    return axios({
      method: "post",
      url: `${BASE_URL}/api/adminlogin`,
      headers: {
        'CSRF-Token': csrfToken,
      },
      data: {
        user_email: email,
        user_password: password,
      },
    })
      .then((response) => {
        const { token } = response.data;
        reactLocalStorage.set("token", token);
        // localStorage.setItem('token', response.data.token)
        // const token = localStorage.getItem('token')
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