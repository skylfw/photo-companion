import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <div key="sign-in" className="navbar-right">
      <Link to="/user-sessions/new" className="signin-button submit-button">
        Sign In
      </Link>
      <Link to="/users/new" className="signup-button submit-button">
        Sign Up
      </Link>
    </div>,
  ];

  const authenticatedListItems = [
    <div key="profile">
      <Link to="/profile">Profiles</Link>
    </div>,
    <div key="sign-out">
      <SignOutButton />
    </div>,
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="">
          <div className="navbar-left-items">
            {/* <img id="logo" src="https://photo-companion-production.s3.amazonaws.com/logo.png"></img> */}
            <Link className="navbar-home" to="/">
              Photo Companion
            </Link>
            <Link className="navbar-link" to="/collections">
              Galleries
            </Link>
            <Link className="navbar-link" to="/users">
              Photographers
            </Link>
          </div>
        </div>
        <div className="navbar-right">
          {user ? authenticatedListItems : unauthenticatedListItems}
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
