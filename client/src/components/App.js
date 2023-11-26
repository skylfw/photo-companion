import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import CollectionsList from "./CollectionsList";
import CollectionForm from "./CollectionForm";
import CollectionsShow from "./CollectionsShow";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import UsersList from "./UsersList";
import UserProfile from "./UserProfile";
import ProfileShow from "./ProfileShow";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      console.log(err);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/">
          <div
            style={{
              backgroundColor: "black",
              height: "100vh",
              overflow: "hidden",
            }}
          >
            <img
              className="landing-page-img"
              src="https://images.unsplash.com/photo-1683009427513-28e163402d16?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
          <div className="landing-container">
            <h1 className="landing-page-text">
              Welcome to Photo Companion! Let us help you locate local photographers.
            </h1>
            <button className="submit-button landing-button">Sign Up</button>
          </div>
        </Route>
        <AuthenticatedRoute
          exact={true}
          path="/users"
          component={UsersList}
          user={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <AuthenticatedRoute
          exact={true}
          path="/users/:id"
          component={ProfileShow}
          user={currentUser}
          setCurrentUser={setCurrentUser}
        />

        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route
          exact
          path="/profile"
          render={(props) => {
            if (currentUser) {
              return <UserProfile user={currentUser} setCurrentUser={setCurrentUser} {...props} />;
            }
          }}
        />
        <Route
          exact
          path="/collections"
          render={(props) => {
            return <CollectionsList user={currentUser} {...props} />;
          }}
        />
        <AuthenticatedRoute
          exact={true}
          path="/collections/new"
          component={CollectionForm}
          user={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <Route exact path="/collections/:id" component={CollectionsShow} />
      </Switch>
    </Router>
  );
};

export default hot(App);
