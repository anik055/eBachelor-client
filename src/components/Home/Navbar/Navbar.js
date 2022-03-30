import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../Login/Login/AuthContext";

import "./navbar.css";

function Navbar() {
  const { loggedInUser, logout } = useAuth();
  const toggleButton = () => {
    const navbarLinks = document.getElementsByClassName("navbar-links")[0];
    navbarLinks.classList.toggle("active");
  };

  return (
    <div className="navigation">
      <nav className="navbar">
        <NavLink
          style={{ textDecoration: "none", color: "white" }}
          to="/"
          className="brand-title"
        >
          <h4 className="brand-logo">eBachelor</h4>
        </NavLink>
        <a onClick={toggleButton} className="toggle-button">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className="navbar-links active">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              {loggedInUser ? (
                <Link onClick={logout} to="/login">
                  SignOut
                </Link>
              ) : (
                <Link to="/login">Login </Link>
              )}
            </li>
            <li>
              <Link to="/dashboard">
                <h5>{loggedInUser ? loggedInUser.displayName : "user"}</h5>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
