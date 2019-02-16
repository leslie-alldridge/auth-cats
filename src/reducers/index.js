import { combineReducers } from "redux";
import cats from "./cats";
import auth from "./auth";
//combine all reducer files and squish them into one object. this overall object is our Redux Store State
export default combineReducers({
  auth, //we now have auth and cats in our combined redux store state
  cats
});
