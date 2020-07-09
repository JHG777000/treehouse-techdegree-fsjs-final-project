import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class CreateCourse extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      name: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      errors: [],
    };
  }

  render() {
    const authUser = this.props.utility().authenticatedUser();
    const username = authUser === null ? 'noone' : authUser.firstName;
    return (
      <div>
        <h1>Create Course</h1>
        <Form
          buttonClassName="grid-100 pad-bottom"
          cancel={this.cancel}
          errors={this.state.errors}
          submit={this.submit}
          submitButtonText="Create Course"
          elements={() => (
            <Fragment>
              <Fragment>
                <div class="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="input-title course--title--input"
                      value={this.state.title}
                      onChange={this.change}
                      placeholder="Course title..."
                    />
                    <p>By {username}</p>
                    <div className="course--description">
                      <textarea
                        id="description"
                        name="description"
                        type="text"
                        value={this.state.description}
                        onChange={this.change}
                        placeholder="Course description..."
                      />
                    </div>
                  </div>
                </div>
              </Fragment>
              <Fragment>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          className="course--time--input"
                          value={this.state.estimatedTime}
                          onChange={this.change}
                          placeholder="Hours"
                        />
                      </li>
                      <li class="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          value={this.state.materialsNeeded}
                          onChange={this.change}
                          placeholder="List materials..."
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </Fragment>
            </Fragment>
          )}
        />
      </div>
    );
  }

  change = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submit = () => {
    // Create Course
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

    const CreateCourse = async () => {
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

    const res = CreateCourse();

    res.then((errors) => {
      if (errors !== undefined && errors.length) {
        this.setState({ errors });
      }
    });
  };
}
