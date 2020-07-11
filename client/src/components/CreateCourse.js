import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Form from './Form';

export default class CreateCourse extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      error: undefined,
      errors: [],
    };
  }

  render() {
    if (this.state.error !== undefined) return <Redirect to="/error" />;

    const authUser = this.props.utility().authenticatedUser();
    const username =
      authUser === null
        ? 'noone'
        : authUser.firstName + ' ' + authUser.lastName;
    return (
      <div>
        <h1>Create Course</h1>
        <Form
          utility={this.props.utility}
          buttonClassName="grid-100 pad-bottom"
          submit={this.submit}
          submitButtonText="Create Course"
          elements={() => (
            <Fragment>
              <Fragment>
                <div className="grid-66">
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
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          value={this.state.materialsNeeded}
                          onChange={this.change}
                          placeholder={'List materials...'}
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
    //Create Course
    const course = {
      title: this.state.title,
      description: this.state.description,
      estimatedTime: this.state.estimatedTime,
      materialsNeeded: this.state.materialsNeeded,
    };

    const user = this.props.utility().getUser();

    const getAuth = this.props.utility().getAuth;
    const sendData = this.props.utility().sendData;
    //Create the course with the API
    const CreateCourse = async () => {
      const res = await fetch(
        'http://localhost:5000/api/courses',
        sendData(course, getAuth(user, 'POST'))
      );
      if (res.status >= 400) {
        if (res.status >= 500) this.setState({ error: res.status });
        return res.json().then((data) => {
          return data.message;
        });
      }
      return [];
    };

    const res = CreateCourse();

    res.then((errors) => {
      if (errors !== undefined && errors.length) {
        this.props.utility().setError(errors);
      }
    });
  };
}
