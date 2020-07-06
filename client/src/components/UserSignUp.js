import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      password: '',
      errors: [],
    };
  }

  render() {
    // const { name, username, password, errors } = this.state.;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={this.state.errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <Fragment>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.change}
                  placeholder="User Name"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.change}
                  placeholder="Password"
                />
              </Fragment>
            )}
          />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    this.setState(() => {
      return {
        [event.target.name]: event.target.value,
      };
    });
  };

  submit = () => {
    //const { context } = this.props;
    //const { name, username, password } = this.state;

    // Create user
    const user = {
      name,
      username,
      password,
    };

    //createUser

    cancel = () => {};
  };
}
