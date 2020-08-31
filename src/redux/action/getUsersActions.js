import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import {LOADUSERSLIST_PENDING, LOADUSERSLIST_SUCCESS, LOADUSERSLIST_REJECTED} from './actionTypes'

const BASE_URL = process.env.ENDPOINT;
export const getUserList = () => {
    const jwtToken = reactLocalStorage.get("token");
    return (dispatch) => {
        dispatch({ type: LOADUSERSLIST_PENDING });
        return axios({
            method: "get",
            url: `${BASE_URL}/api/getusers`,
            headers: {
                Authorization: jwtToken
            }
          })
    }
}