import { combineReducers } from "redux";
import cats from "./cats";
import auth from "./auth";
//combine all reducer files and squish them into one object. this overall object is our Redux Store State
export default combineReducers({
  auth,
  cats
});
