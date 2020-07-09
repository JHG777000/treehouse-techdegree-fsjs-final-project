import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      errors: [],
    };
  }

  getErrors = () => {
    return this.state.errors;
  };

  render() {
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
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={this.state.firstName}
                  onChange={this.change}
                  placeholder="First Name"
                />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={this.state.lastName}
                  onChange={this.change}
                  placeholder="Last Name"
                />
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={this.state.emailAddress}
                  onChange={this.change}
                  placeholder="Email Address"
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
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submit = () => {
    // Create user
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailAddress: this.state.emailAddress,
      password: this.state.password,
    };

    const user0 = {
      username: this.state.emailAddress,
      password: this.state.password,
    };

    const getAuth = this.props.utility().getAuth;
    const sendData = this.props.utility().sendData;

    const createUser = async () => {
      const res = await fetch(
        'http://localhost:5000/api/users',
        sendData(user, getAuth(user0, 'POST'))
      );
      if (res.status >= 400) {
        return res.json().then((data) => {
          return data.message;
        });
      }
      return [];
    };

    const res = createUser();

    res.then((errors) => {
      if (errors !== undefined && errors.length) {
        this.setState({ errors });
      } else {
        const authUser = this.props
          .utility()
          .signIn(user.emailAddress, user.password);
        authUser.then((errors) => {
          if (errors !== undefined && errors.length) {
            this.setState({ errors });
          }
        });
      }
    });
  };
}
