import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  constructor() {
    super();
    this.state = {
      emailAddress: '',
      password: '',
      errors: [],
    };
  }

  render() {
    const authUser = this.props.utility().authenticatedUser();
    if (authUser !== null) window.history.back();
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form
            errors={this.state.errors}
            utility={undefined}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <Fragment>
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
            Don't have a user account? <Link to="/signup">Click here</Link> to
            sign up!
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
    const user = {
      emailAddress: this.state.emailAddress,
      password: this.state.password,
    };

    const authUser = this.props
      .utility()
      .signIn(user.emailAddress, user.password);

    authUser.then((errors) => {
      if (errors !== undefined && errors.length) {
        this.setState({ errors });
      }
    });
  };
}
