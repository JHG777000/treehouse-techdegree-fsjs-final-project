/************************************************
Treehouse Techdegree:
FSJS project 10 - React Gallery App
************************************************/

import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Courses from './Courses';
import CourseDetail from './CourseDetail';
import CreateCourse from './CreateCourse';
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
      authenticatedUser: null,
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
      })
      .catch((error) => {
        this.setState({ authenticatedUser: null });
      });

    return [];
  };

  signOut = () => {
    const user = {
      username: undefined,
      password: undefined,
    };

    this.setState({ user: user, authenticatedUser: null });
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

  sendData = (data, options) => {
    options.body = JSON.stringify(data);
    return options;
  };

  render() {
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
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
