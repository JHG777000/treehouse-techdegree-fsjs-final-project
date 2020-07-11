import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import UnhandledError from './UnhandledError';

export default class UpdateCourse extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      course: {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
      },
      error: undefined,
      errors: [],
    };
  }

  componentDidMount() {
    this.performQuery(this.props.match.params.id);
  }

  performQuery = (id) => {
    fetch(`http://localhost:5000/api/courses/` + id)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ course: responseData });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        this.setState({ error });
      });
  };

  render() {
    if (this.state.error !== undefined && this.state.error >= 500)
      return <UnhandledError />;

    if (
      this.props.utility().getError() !== undefined &&
      this.props.utility().getError() === 'Could not find course.'
    )
      return <UnhandledError />;

    const authUser = this.props.utility().authenticatedUser();
    const username =
      authUser === null
        ? 'noone'
        : authUser.firstName + ' ' + authUser.lastName;
    return (
      <div>
        <h1>Update Course</h1>
        <Form
          utility={this.props.utility}
          buttonClassName="grid-100 pad-bottom"
          cancel={this.cancel}
          errors={this.state.errors}
          submit={this.submit}
          submitButtonText="Update Course"
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
                      placeholder={
                        this.state.course === undefined
                          ? ''
                          : this.state.course.title
                      }
                    />
                    <p>By {username}</p>
                    <div className="course--description">
                      <textarea
                        id="description"
                        name="description"
                        type="text"
                        value={this.state.description}
                        onChange={this.change}
                        placeholder={
                          this.state.course === undefined
                            ? ''
                            : this.state.course.description
                        }
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
                          placeholder={
                            this.state.course === undefined
                              ? ''
                              : this.state.course.estimatedTime
                          }
                        />
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          value={this.state.materialsNeeded}
                          onChange={this.change}
                          placeholder={
                            this.state.course === undefined
                              ? ''
                              : this.state.course.materialsNeeded
                          }
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
    // Update Course
    const course = {
      title: this.state.title,
      description: this.state.description,
      estimatedTime: this.state.estimatedTime,
      materialsNeeded: this.state.materialsNeeded,
    };

    const user = this.props.utility().getUser();

    const getAuth = this.props.utility().getAuth;
    const sendData = this.props.utility().sendData;

    const UpdateCourse = async () => {
      const res = await fetch(
        `http://localhost:5000/api/courses/` + this.props.match.params.id,
        sendData(course, getAuth(user, 'PUT'))
      );
      if (res.status >= 400) {
        this.setState({ error: res.status });
        return res.json().then((data) => {
          return data.message;
        });
      }
      return [];
    };

    const res = UpdateCourse();

    res.then((errors) => {
      if (errors !== undefined && errors.length) {
        this.props.utility().setError(errors);
      }
    });
  };
}
