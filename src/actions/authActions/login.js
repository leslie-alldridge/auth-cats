import axios from "axios";
import { saveUserToken } from "../../authUtilities/auth";
import { getAllAction } from "../cats/getAll";

// Generally we use const here so that in our reducers we can import the const and prevent any typos. Writing strings "like this" won't break the code and this makes it hard to debug. Whereas mistyping a constant will.

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

//There are our functions for redux - please see the cat examples as this part of the project assumes you're comfortable with redux.

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  };
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return axios
      .post("/signin", creds) //creds is the information obtained from the login form
      .then(response => {
        if (response.data.message !== "Authentication successful.") {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(response.data.message));
          return Promise.reject(response.data.message);
        } else {
          // If login was successful, set the token in local storage
          const userInfo = saveUserToken(response.data.token);
          // Dispatch the success action

          dispatch(receiveLogin(userInfo));
          // dispatch(getAllAction());
          //
          //now that we're logged in go get me my cats
          //we can find user specific cats now that our userInfo exists in the line above.
          //adding getUserCats(userInfo.user_name) could be a function that finds cats
          //whose users matches the user logged in.

          // I've commented this out for now so cats will return on button click
        }
      })
      .catch(err => dispatch(loginError(err)));
  };
}
