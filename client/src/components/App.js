/************************************************
Treehouse Techdegree:
FSJS project 10 - React Gallery App
************************************************/

import React from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Courses from './Courses';
import CourseDetail from './CourseDetail';
import CreateCourse from './CreateCourse';
import DeleteCourse from './DeleteCourse';
import UpdateCourse from './UpdateCourse';
import Header from './Header';
import UserSignOut from './UserSignOut';
import UserSignUp from './UserSignUp';
import UserSignIn from './UserSignIn';
import UnhandledError from './UnhandledError';
import NotFound from './NotFound';
import Forbidden from './Forbidden';
//Manages and sets up global state
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      //user stores username(email), and password
      user: {
        username: undefined,
        password: undefined,
      },
      //authenticatedUser is the user object returned from the API, and
      //contains firstName, lastName, email, and userId
      authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
      //errorState contains error state for UpdateCourse, and CreateCourse
      errorState: undefined,
    };
  }

  //Allows other components to access global state
  utility = () => {
    return {
      signIn: this.signIn,
      signOut: this.signOut,
      getAuth: this.getAuth,
      authenticatedUser: this.getauthenticatedUser,
      getUser: this.getUser,
      sendData: this.sendData,
      setError: this.setError,
      getError: this.getError,
    };
  };

  //signIn, sign in a user
  signIn = async (username, password) => {
    const user = {
      username: username,
      password: password,
    };

    const authUser = await fetch(
      'http://localhost:5000/api/users',
      this.getAuth(user, 'GET')
    );

    if (authUser.status >= 400) {
      this.setState({ authenticatedUser: null });
      return authUser.json().then((data) => {
        return data.message;
      });
    }

    authUser
      .json()
      .then((data) => data)
      .then((responseData) => {
        this.setState({ authenticatedUser: responseData });
        Cookies.set('authenticatedUser', JSON.stringify(responseData), {
          expires: 1,
        });
      })
      .catch((error) => {
        this.setState({ authenticatedUser: null });
      });

    this.setState({ user: user });

    //Slightly better than storing password as plain text
    const encodedPass = btoa(`encodedUser:${Math.random()}:${user.password}`);

    const encodedUser = {
      username: user.username,
      password: encodedPass,
    };

    Cookies.set('encodedUser', JSON.stringify(encodedUser), { expires: 1 });

    return [];
  };

  //signOut, sign out a user
  signOut = () => {
    const user = {
      username: undefined,
      password: undefined,
    };
    this.setState({ user: user, authenticatedUser: null });
    Cookies.remove('authenticatedUser');
    Cookies.remove('encodedUser');
  };

  //getAuth, get auth header
  getAuth = (user, method) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    const encodedCredentials = btoa(`${user.username}:${user.password}`);
    options.headers['Authorization'] = `Basic ${encodedCredentials}`;

    return options;
  };

  //getauthenticatedUser, get the authenticatedUser
  getauthenticatedUser = () => {
    return this.state.authenticatedUser;
  };

  //getUser, get user, from state or a cookie
  getUser = () => {
    let user = Cookies.getJSON('encodedUser') || null;
    if (user === null) return this.state.user;

    //getEncodedPass, decode the password
    const getEncodedPass = (ep) => {
      let i = 0;
      let j = 0;
      let pass = '';
      ep = atob(ep);
      while (i < ep.length) {
        if (ep[i] === ':') j++;
        i++;
        if (j === 2) break;
      }
      while (i < ep.length) {
        if (ep[i] === ':') break;
        pass += ep[i];
        i++;
      }
      return pass;
    };

    const encodedUser = {
      username: user.username,
      password: getEncodedPass(user.password),
    };

    //make sure state is synced
    this.setState({ user: encodedUser });

    return encodedUser;
  };

  //sendData, send data to the API
  sendData = (data, options) => {
    options.body = JSON.stringify(data);
    return options;
  };
  //setError, set error state
  setError = (error) => {
    this.setState({ errorState: error });
  };
  //getError, get error state
  getError = (error) => {
    return this.state.errorState;
  };

  render() {
    const getMergedProps = (component, ...rest) => {
      const finalProps = Object.assign({}, ...rest);
      return React.createElement(component, finalProps);
    };

    const RouteWithProps = ({ component, ...rest }) => {
      return (
        <Route
          {...rest}
          render={(routeProps) => {
            return getMergedProps(component, routeProps, rest);
          }}
        />
      );
    };

    const PrivateRoute = ({ component, redirectTo, ...rest }) => {
      return (
        <Route
          {...rest}
          render={(routeProps) => {
            return this.state.authenticatedUser ? (
              getMergedProps(component, routeProps, rest)
            ) : (
              <Redirect
                to={{
                  pathname: redirectTo,
                  state: { from: routeProps.location },
                }}
              />
            );
          }}
        />
      );
    };
    //Main switch for the App, manages and sets up routes
    return (
      <BrowserRouter>
        <div className="container">
          <Header utility={this.utility} />
          <Switch>
            <Route exact path="/">
              <Courses utility={this.utility} />
            </Route>
            <Route exact path="/signout">
              <UserSignOut utility={this.utility} />
            </Route>
            <Route exact path="/signup">
              <UserSignUp utility={this.utility} />
            </Route>
            <Route exact path="/signin">
              <UserSignIn utility={this.utility} />
            </Route>
            <Route exact path="/error">
              <UnhandledError />
            </Route>
            <Route exact path="/notfound">
              <NotFound />
            </Route>
            <Route exact path="/forbidden">
              <Forbidden />
            </Route>
            <RouteWithProps
              exact
              path="/api/courses/:id"
              component={CourseDetail}
              utility={this.utility}
            />
            <PrivateRoute
              exact
              path="/courses/create"
              component={CreateCourse}
              utility={this.utility}
            />
            <PrivateRoute
              exact
              path="/courses/:id/update"
              component={UpdateCourse}
              utility={this.utility}
            />
            <PrivateRoute
              exact
              path="/courses/:id/delete"
              component={DeleteCourse}
              utility={this.utility}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
