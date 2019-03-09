import React from "react";
import { connect } from "react-redux";
import { getAllAction } from "../../actions/cats/getAll";
import { loginUser } from "../../actions/authActions/login";
import ErrorMessage from "./errorMessage";

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
      username: username.trim(), //what does trim do? it removes any whitespace from the input (leading / preceeding space bars)
      password: password.trim()
    };
    this.props.loginUser(creds);
    // this.props.getAll()
  }

  handleError() {
    this.setState({
      errorVisible: false
    });
  }

  render() {
    return (
      <div>
        <h3>Login Page</h3>
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
          <button>
            <a href="/#/"> Back</a>
          </button>
        </form>
        {/* If we get an error, render the error msg component */}
        {this.state.errorVisible && <ErrorMessage reducer="auth" />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: creds => {
      return dispatch(loginUser(creds));
    },
    getAll: () => {
      return dispatch(getAllAction());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
