import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import UnhandledError from './UnhandledError';

export default class CourseDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      course: undefined,
      error: undefined,
    };
  }
  componentDidMount() {
    this.performQuery(this.props.match.params.id);
  }
  componentDidUpdate() {}

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
    const authUser = this.props.utility().authenticatedUser();
    const TheCourse = (props) => {
      return (
        <Fragment>
          {authUser != null && authUser.id === props.userId ? (
            <Fragment>
              <div className="actions--bar">
                <div className="bounds">
                  <div className="grid-100">
                    <span>
                      <a
                        className="button"
                        href={
                          '/courses/' + this.props.match.params.id + '/update'
                        }
                      >
                        Update Course
                      </a>
                      <a
                        className="button"
                        href={
                          '/courses/' + this.props.match.params.id + '/delete'
                        }
                      >
                        Delete Course
                      </a>
                    </span>
                    <a className="button button-secondary" href="/">
                      Return to List
                    </a>
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="actions--bar">
                <div className="bounds">
                  <div className="grid-100">
                    <a className="button button-secondary" href="/">
                      Return to List
                    </a>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
          <Fragment>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{props.title}</h3>
                  <p>By {props.name}</p>
                </div>
                <div className="course--description">
                  <ReactMarkdown source={props.description} />
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{props.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                        <ReactMarkdown source={props.materialsNeeded} />
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Fragment>
        </Fragment>
      );
    };
    if (this.state.error !== undefined) return <UnhandledError/>;
    if (this.state.course !== undefined) {
      if (this.state.course.User === undefined) return <UnhandledError/>
      const course = this.state.course;
      return (
        <TheCourse
          userId={course.userId}
          title={course.title}
          name={course.User.firstName + ' ' + course.User.lastName}
          description={course.description}
          estimatedTime={course.estimatedTime}
          materialsNeeded={course.materialsNeeded}
        />
      );
    } else
      return (
        <TheCourse
          userId={0}
          title=""
          name=""
          description=""
          estimatedTime=""
          materialsNeeded=""
        />
      );
  }
}
