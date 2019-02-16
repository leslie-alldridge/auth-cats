import React from "react";
import { connect } from "react-redux";

import { loginUser } from "../actions/authActions/login";
import ErrorMessage from "./ErrorMessage";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorVisible: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const creds = {
      username: username.trim(),
      password: password.trim()
    };
    this.props.loginUser(creds);
  }

  handleError() {
    this.setState({
      errorVisible: false
    });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={e => {
            this.handleClick(e);
          }}
        >
          <input
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <button type="submit">Login</button>
          <button
            onClick={() => {
              this.props.registerToggle();
              this.handleError();
            }}
          >
            Register
          </button>
        </form>

        {this.state.errorVisible && <ErrorMessage reducer="auth" />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: creds => {
      return dispatch(loginUser(creds));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
