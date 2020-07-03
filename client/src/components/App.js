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
    };
  }
  componentDidMount() {
   
  }
  componentDidUpdate() {}
  utility = () => {
    return {
      signIn: this.signIn,
    };
  };

  signIn = () => {};

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
