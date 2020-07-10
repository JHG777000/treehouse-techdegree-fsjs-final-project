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
import UpdateCourse from './UpdateCourse';
import Header from './Header';
import UserSignOut from './UserSignOut';
import UserSignUp from './UserSignUp';
import UserSignIn from './UserSignIn';

//Main switch for the App, manages and sets up routes
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: undefined,
        password: undefined,
      },
      authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}

  utility = () => {
    return {
      signIn: this.signIn,
      signOut: this.signOut,
      getAuth: this.getAuth,
      authenticatedUser: this.getauthenticatedUser,
      getUser: this.getUser,
      sendData: this.sendData,
    };
  };

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

    const encodedPass = btoa(`encodedUser:${Math.random()}:${user.password}`);

    const encodedUser = {
      username: user.username,
      password: encodedPass,
    };
    Cookies.set('encodedUser', JSON.stringify(encodedUser), { expires: 1 });
    return [];
  };

  signOut = () => {
    const user = {
      username: undefined,
      password: undefined,
    };

    this.setState({ user: user, authenticatedUser: null });
    Cookies.remove('authenticatedUser');
    Cookies.remove('encodedUser');
  };

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

  getauthenticatedUser = () => {
    return this.state.authenticatedUser;
  };

  getUser = () => {
    let user = Cookies.getJSON('encodedUser') || null;
    if (user === null) return this.state.user;
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
    this.setState({ user: encodedUser });
    return encodedUser;
  };

  getTest = () => {
    return this.state.test;
  };

  sendData = (data, options) => {
    options.body = JSON.stringify(data);
    return options;
  };

  render() {
    const renderMergedProps = (component, ...rest) => {
      const finalProps = Object.assign({}, ...rest);
      return React.createElement(component, finalProps);
    };

    const PropsRoute = ({ component, ...rest }) => {
      return (
        <Route
          {...rest}
          render={(routeProps) => {
            return renderMergedProps(component, routeProps, rest);
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
              renderMergedProps(component, routeProps, rest)
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
    return (
      <BrowserRouter>
        <div className="container">
          <Header utility={this.utility} />
          <Switch>
            <Route exact path="/">
              <Courses utility={this.utility} />
            </Route>
            <Route exact path="/courses/create">
              <CreateCourse utility={this.utility} />
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
            <Route exact path="/api/courses/:id" component={CourseDetail} />
            <PrivateRoute
              exact
              path="/courses/:id/update"
              component={UpdateCourse}
              utility={this.utility}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
