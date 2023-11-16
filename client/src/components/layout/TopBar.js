import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <div key="sign-in" className="flex items-center space-x-4 text-lg font-semibold tracking-tight">
      <li>
        <Link
          to="/user-sessions/new"
          className="px-6 py-2 text-black transition duration-700 ease-out bg-white border border-black rounded-lg hover:bg-black hover:border hover:text-white dark:border-white dark:bg-inherit dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          Sign In
        </Link>
      </li>
      <li key="sign-up">
        <Link
          to="/users/new"
          className="px-6 py-2 text-white transition duration-500 ease-out bg-blue-700 rounded-lg hover:bg-blue-800 hover:ease-in hover:underline"
        >
          Sign Up
        </Link>
      </li>
    </div>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-10 w-full px-4 py-1 bg-white shadow-md border-slate-500 dark:bg-[#0c1015] transition duration-700 ease-out">
      <div className="flex justify-between p-4">
        <div className="text-[2rem] leading-[3rem] tracking-tight font-bold text-black dark:text-white">
          <div className="flex">
            <img id="logo" src="https://photo-companion-production.s3.amazonaws.com/logo.png"></img>
            <Link to="/" className="text-2xl">
              Photo Companion
            </Link>
          </div>
        </div>
        <ul>{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </nav>
  );
};

export default TopBar;
