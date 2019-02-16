import React, { Component } from "react";
import { connect } from "react-redux";
import GetAll from "./components/GetAll";
import GetOne from "./components/GetOne";
import SaveOne from "./components/saveOne";
import "./App.css";
import DeleteOne from "./components/DeleteOne";
import EditOne from "./components/EditOne";

//auth imports
import LoginForm from "./authComponents/login";
import RegisterForm from "./authComponents/register";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerToggle: false
    };
  }

  registerToggle = () => {
    this.setState(prevState => ({
      registerToggle: !prevState.registerToggle
    }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.props.auth.isAuthenticated && !this.state.registerToggle && (
            <LoginForm registerToggle={this.registerToggle} />
          )}
          {!this.props.auth.isAuthenticated && this.state.registerToggle && (
            <RegisterForm registerToggle={this.registerToggle} />
          )}
          <GetAll />
          <br />
          <GetOne />
          <br />
          <SaveOne />
          <br />
          <DeleteOne />
          <br />
          <EditOne />
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  null
)(App);
