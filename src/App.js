import React, { Component } from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";

import "./App.css";

//cats imports
import GetAll from "./components/cats/GetAll";
import GetOne from "./components/cats/GetOne";
import SaveOne from "./components/cats/saveOne";
import DeleteOne from "./components/cats/DeleteOne";
import EditOne from "./components/cats/EditOne";

//auth imports
import LoginForm from "./components/auth/login";
import RegisterForm from "./components/auth/register";
import Logout from "./components/auth/logout";

//other imports
import Nav from "./components/common/Nav";

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
      <Router>
        <div className="App">
          <header className="App-header">
            {/* only unauthenticated users can login */}
            <Route path="/" component={Nav} />
            {!this.props.auth.isAuthenticated && (
              // <LoginForm registerToggle={this.registerToggle} />
              <Route exact path="/login" component={LoginForm} />
            )}

            {/* only unauthenticated users can register */}
            {!this.props.auth.isAuthenticated && (
              <Route exact path="/register" component={RegisterForm} />
            )}

            {/* Only authenticated users can see logout and our other cat components - you can try force change the state but routes are protected so they'll just load indefinitely and no data will show */}
            {this.props.auth.isAuthenticated && (
              <React.Fragment>
                <Logout user={this.props.auth.user.username} />
                <Route exact path="/getall" component={GetAll} />
                <br />
                <Route exact path="/getone" component={GetOne} />
                <br />
                <Route exact path="/saveone" component={SaveOne} />
                <br />
                <Route exact path="/deleteone" component={DeleteOne} />
                <br />
                <Route exact path="/editone" component={EditOne} />
              </React.Fragment>
            )}
          </header>
        </div>
      </Router>
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
