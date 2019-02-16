import { removeUser } from "../../authUtilities/auth";

// Generally we use const here so that in our reducers we can import the const and prevent any typos. Writing strings "like this" won't break the code and this makes it hard to debug. Whereas mistyping a constant will.

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

//There are our functions for redux - please see the cat examples as this part of the project assumes you're comfortable with redux.

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout()); //Logout request
    removeUser(); //sets the token in localstorage to null. We import this function at the top of the file ^^
    dispatch(receiveLogout()); //tell redux we're no longer authenticated
  };
}
