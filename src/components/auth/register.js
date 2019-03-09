import React from "react";
import { connect } from "react-redux";

import {
  registerUser,
  registerError
} from "../../actions/authActions/register";
import ErrorMessage from "./errorMessage";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirm: "",
      err: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clearError = this.clearError.bind(this);
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  handleClick(e) {
    this.setState({
      err: true
    });
    e.preventDefault();
    const { username, password, confirm } = this.state;
    if (password !== confirm) {
      this.props.registerError("Passwords do not match!");
      return;
    }
    const creds = {
      username: username.trim(), //trim removes any spaces around their input
      password: password.trim()
    };
    this.props.registerUser(creds);
  }

  clearError() {
    this.props.errorClear();
  }

  render() {
    const { username, password, confirm } = this.state;
    return (
      <div>
        <h3>Register Page</h3>
        <form
          onSubmit={e => {
            this.handleClick(e);
          }}
        >
          <input
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={username}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={password}
          />

          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            onChange={this.handleChange}
            value={confirm}
          />

          <button type="submit">Register</button>
          <button>
            <a href="/">Back</a>
          </button>
        </form>

        {this.state.err && <ErrorMessage reducer="auth" />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerUser: creds => {
      return dispatch(registerUser(creds));
    },
    registerError: message => {
      dispatch(registerError(message));
    },
    errorClear: () => {
      dispatch(registerError(""));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RegisterForm);
