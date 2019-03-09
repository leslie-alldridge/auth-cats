import React from "react";

export const Nav = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Auth Cats
        {props.auth && <p>auths</p>}
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
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Cats
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="/#/getall">
                Get All
              </a>
              <a class="dropdown-item" href="/#/getone">
                Get One
              </a>
              <a class="dropdown-item" href="/#/deleteone">
                Delete One
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
