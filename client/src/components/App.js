/************************************************
Treehouse Techdegree:
FSJS project 10 - React Gallery App
************************************************/

import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Courses from './Courses';

//Main switch for the App, manages and sets up routes

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Courses />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
