import decode from "jwt-decode";

import { get, set } from "./localstorage"; //basically our functions to save / read from localstorage

export function isAuthenticated() {
  const token = get("token");

  if (token) {
    const payload = decode(token);
    const expiry = payload.exp;

    if (expiry < new Date().getTime() / 1000) {
      //if token has expired then run remove user which will set it to null
      removeUser();
      return false;
    }
    return true;
  } else {
    return false;
  }
}

//Why do we need to decode or use JWT tokens for auth? I've included an article below for more information
//
//   https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec
//

export function saveUserToken(token) {
  set("token", token);
  return decode(token);
}

export function getUserTokenInfo() {
  const token = get("token");
  return token ? decode(token) : null;
}

export function removeUser() {
  set("token", null);
}
