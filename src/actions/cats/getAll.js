import axios from "axios";
import { get } from "../../authUtilities/localstorage";
//stretch goal - move this into a utilities file so we don't need to write it in every single action

// This will make an API request to get all cats, while telling redux its loading and what response comes back
export function getAllAction() {
  // get the token from localstorage

  const token = get("token");

  //append the token to our API requests - without this you'll get an access forbidden error
  axios.defaults.headers.common = { Authorization: `bearer ${token}` };
  return function(dispatch) {
    dispatch(loading());
    axios.get("/api/v1/cats/").then(response => {
      if (!response.status == 200) {
        dispatch(errorMessage(response.status));
      } else {
        dispatch(receiveCats(response.data));
      }
    });
  };
}

function loading() {
  return {
    type: "LOADING",
    isFetching: true
  };
}

function errorMessage(err) {
  return {
    type: "ERROR",
    isFetching: false,
    err
  };
}

function receiveCats(cats) {
  return {
    type: "SUCCESS",
    isFetching: false,
    cats
  };
}
