import axios from "axios";

// This will make an API request to get all cats, while telling redux its loading and what response comes back
export function getAllAction() {
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
