import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import { Redirect } from 'react-router-dom';

export default class CourseDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      course: undefined,
    };
  }
  componentDidMount() {
    this.performQuery(this.props.match.params.id);
    setInterval(() => {
      this.performQuery(this.props.match.params.id);
    }, 500);
  }

  //performQuery, fetch course data
  performQuery = async (id) => {
    const res = await fetch(`http://localhost:5000/api/courses/` + id);
    if (res.status === 200)
      return res.json().then((data) => this.setState({ course: data }));

    if (res.status >= 400) this.props.utility().setInternalError(res.status);
  };

  render() {
    //get authenticatedUser
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

    //Redirect if error
    if (
      this.props.utility().getInternalError() !== undefined &&
      this.props.utility().getInternalError() >= 500
    )
      return <Redirect to="/error" />;
    if (
      this.props.utility().getInternalError() !== undefined &&
      this.props.utility().getInternalError() === 404
    )
      return <Redirect to="/notfound" />;

    //render the course
    if (this.state.course !== undefined) {
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
