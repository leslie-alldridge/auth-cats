import React from "react";
import { connect } from "react-redux";

import { logoutUser } from "../actions/authActions/logout";

const Logout = props => {
  return (
    <div id="wrapperlogin">
      <p id="welcome">
        Currently logged in as <b>{props.user}</b>
      </p>
      <button onClick={props.logoutUser}>Log out</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
