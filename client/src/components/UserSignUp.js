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
    //const { context } = this.props;
    //const { name, username, password } = this.state;

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

    //createUser
    const res = fetch(
      'http://localhost:5000/api/users',
      sendData(user, getAuth(user0,'POST'))
    )
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.utility().signIn(user.emailAddress, user.password);
          
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.length) this.setState({ errors: err });
      });
  };
}
