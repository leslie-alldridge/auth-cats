import React from "react";
import { connect } from "react-redux";

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Auth Cats
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            {!this.props.auth.isAuthenticated && (
              <React.Fragment>
                <li className="nav-item">
                  <a className="nav-link" href="/#/login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#/register">
                    Register
                  </a>
                </li>
              </React.Fragment>
            )}
            {this.props.auth.isAuthenticated && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Cats
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a className="dropdown-item" href="/#/getall">
                    Get All
                  </a>
                  <a className="dropdown-item" href="/#/getone">
                    Get One
                  </a>
                  <a className="dropdown-item" href="/#/deleteone">
                    Delete One
                  </a>
                  <a className="dropdown-item" href="/#/editone">
                    Edit One
                  </a>
                  <a className="dropdown-item" href="/#/saveone">
                    Save One
                  </a>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
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
)(Nav);
