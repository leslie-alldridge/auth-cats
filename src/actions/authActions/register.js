import axios from "axios";
import { receiveLogin } from "./login";
import { saveUserToken } from "../../authUtilities/auth";
import { getAllAction } from "../cats/getAll";

// Generally we use const here so that in our reducers we can import the const and prevent any typos. Writing strings "like this" won't break the code and this makes it hard to debug. Whereas mistyping a constant will.

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

//There are our functions for redux - please see the cat examples as this part of the project assumes you're comfortable with redux.

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
        if (response.data.message !== "Authentication successful.") {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(registerError("Invalid Credentials"));
          return Promise.reject(response.data.message); //this will send us to the .catch below
        } else {
          // If login was successful, set the token in local storage
          const userInfo = saveUserToken(response.data.token);
          // Dispatch the success action
          dispatch(receiveLogin(userInfo));
          dispatch(getAllAction()); //now that we're logged in go get me my cats
          //we can find user specific cats now that our userInfo exists in the line above.
          //adding getUserCats(userInfo.user_name) could be a function that finds cats
          //whose users matches the user logged in.
        }
      })
      .catch(err => {
        dispatch(registerError(err.response.statusText));
      });
  };
}
