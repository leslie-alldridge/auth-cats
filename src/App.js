import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

//cats imports
import GetAll from "./components/GetAll";
import GetOne from "./components/GetOne";
import SaveOne from "./components/saveOne";
import DeleteOne from "./components/DeleteOne";
import EditOne from "./components/EditOne";

//auth imports
import LoginForm from "./authComponents/login";
import RegisterForm from "./authComponents/register";
import Logout from "./authComponents/logout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerToggle: false
    };
  }

  //this just toggles whether the user wants to see login or register forms
  registerToggle = () => {
    this.setState(prevState => ({
      registerToggle: !prevState.registerToggle
    }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* only unauthenticated users can login */}

          {!this.props.auth.isAuthenticated && !this.state.registerToggle && (
            <LoginForm registerToggle={this.registerToggle} />
          )}

          {/* only unauthenticated users can register */}
          {!this.props.auth.isAuthenticated && this.state.registerToggle && (
            <RegisterForm registerToggle={this.registerToggle} />
          )}

          {/* Only authenticated users can see logout and our other cat components - you can try force change the state but routes are protected so they'll just load indefinitely and no data will show */}
          {this.props.auth.isAuthenticated && (
            <React.Fragment>
              <Logout user={this.props.auth.user.username} />

              <GetAll />
              <br />
              <GetOne />
              <br />
              <SaveOne />
              <br />
              <DeleteOne />
              <br />
              <EditOne />
            </React.Fragment>
          )}
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth //this is all of our auth information, check out the dev tools!
  };
}

export default connect(
  mapStateToProps,
  null
)(App);
