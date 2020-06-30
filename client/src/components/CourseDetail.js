import React from 'react';

export default class CourseDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      course: undefined,
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
      });
  };

  render() {
    if (this.state.course !== undefined) {
      return (
        <div>
          <h1>Hello WOrld!</h1>
          <h1>{this.state.course.title}</h1>
        </div>
      );
    } else
      return (
        <div>
          <h1>Hello WOrld!</h1>
        </div>
      );
  }
}
