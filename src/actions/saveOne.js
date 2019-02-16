import axios from "axios";

//stretch goal - move this into a utilities file so we don't need to write it in every single action

// get the token from localstorage
import { get } from "../authUtilities/localstorage";
const token = get("token");

//append the token to our API requests - without this you'll get an access forbidden error
axios.defaults.headers.common = { Authorization: `bearer ${token}` };

// This will make an API request to save cat, while telling redux its loading and what response comes back
export function saveOneAction(name, age, location) {
  const data = {
    name,
    age,
    location
  };
  return function(dispatch) {
    dispatch(loading());
    axios.post(`/api/v1/cats/save`, data).then(response => {
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
