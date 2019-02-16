import { LOGOUT_SUCCESS } from "../actions/authActions/logout";
import {
  REGISTER_REQUEST,
  REGISTER_FAILURE
} from "../actions/authActions/register";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/authActions/login";
import { isAuthenticated, getUserTokenInfo } from "../authUtilities/auth";

const initialState = {
  isFetching: false,
  isAuthenticated: isAuthenticated(), //this is cool, it checks the initial state to see if you are already authenticated -> if you are then you'll log straight in
  user: getUserTokenInfo(), //required to make sure token is still ok
  errorMessage: ""
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: //if I was to mistype the const the code would throw an error saying it's undefined. This is safer than using strings like in my cats reducer. Maybe you can submit a PR and help me fix it?
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: ""
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.user
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: "Invalid Credentials" //this is hardcoded, check my action and see if you're able to fix it? I want to encourage PR's for your benefit!
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
        isFetching: false,
        isAuthenticated: false,
        user: null
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: ""
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      };

    default:
      return state;
  }
}
