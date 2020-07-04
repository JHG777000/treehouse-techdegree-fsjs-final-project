/************************************************
Treehouse Techdegree:
FSJS project 10 - React Gallery App
************************************************/

import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Courses from './Courses';
import CourseDetail from './CourseDetail';

//Main switch for the App, manages and sets up routes
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: undefined,
        password: undefined,
      },
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}

  utility = () => {
    return {
      signIn: this.signIn,
      signOut: this.signOut,
      getAuth: this.getAuth,
    };
  };

  signIn = async (username, password) => {
    const user = {
      username: username,
      password: password,
    };

    const authUser = await fetch(
      'http://localhost:5000/api/users',
      this.getAuth('GET')
    );

    if (authUser.status === 401) {
      return null;
    }

    this.setState({ user: user });
  };

  signOut = () => {
    const user = {
      username: undefined,
      password: undefined,
    };

    this.setState({ user: user });
  };

  getAuth = method => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    const encodedCredentials = btoa(
      `${this.state.user.username}:${this.state.user.password}`
    );
    options.headers['Authorization'] = `Basic ${encodedCredentials}`;

    return options;
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Courses utility={this.utility} />
            </Route>
            <Route exact path="/api/courses/:id" component={CourseDetail} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
