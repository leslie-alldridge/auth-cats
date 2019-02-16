import axios from "axios";
import { receiveLogin } from "./login";
import { saveUserToken } from "../../authUtilities/auth";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

function requestRegister(creds) {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

export function registerError(message) {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

export function registerUser(creds) {
  return dispatch => {
    // We dispatch requestRegister to kickoff the call to the API
    dispatch(requestRegister(creds));

    return axios
      .post("/register", creds)
      .then(response => {
        console.log(response);

        if (response.data.message !== "Authentication successful.") {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(registerError("Invalid Credentials"));
          return Promise.reject(response.data.message);
        } else {
          // If login was successful, set the token in local storage
          const userInfo = saveUserToken(response.data.token);
          // Dispatch the success action
          dispatch(receiveLogin(userInfo));
        }
      })
      .catch(err => {
        console.log(err);

        dispatch(registerError(err));
      });
  };
}
