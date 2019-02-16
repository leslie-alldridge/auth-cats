import React from "react";
import { connect } from "react-redux";

const ErrorMessage = props => {
  return <p id="error">{props.message}</p>; //this is all this component does -> returns the error message inside <p> tags
};

const mapStateToProps = (state, ownProps) => {
  return {
    message: state[ownProps.reducer].errorMessage
  };
};

export default connect(mapStateToProps)(ErrorMessage);
