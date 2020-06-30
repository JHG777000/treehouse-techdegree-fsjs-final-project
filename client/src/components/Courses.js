import React from 'react';

export default class Courses extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: undefined,
    };
  }
  componentDidMount() {
    this.performQuery();
  }
  componentDidUpdate() {}

  performQuery = () => {
    fetch(`http://localhost:5000/api/courses`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ courses: responseData });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  };

  render() {
    const Boxes = (props) => {
      const TheCourse = (props) => {
        return (
          <div className="grid-33">
            <a className="course--module course--link" href={"/api/courses/" + props.id}>
              <h4 className="course--label"> Course </h4>
              <h3 className="course--title">{props.title}</h3>
            </a>
          </div>
        );
      };
      const results = props.data;
      let boxes = undefined;
      if (results !== undefined && results.length > 0) {
        boxes = results.map((box) => (
          <TheCourse title={box.title} id={box.id} key={box.id} />
        ));
      }
      return <div>{boxes}</div>;
    };

    return (
      <div>
        <div className="bounds">
          <Boxes data={this.state.courses} />
          <div className="grid-33">
            <a
              className="course--module course--add--module"
              href="/courses/create"
            >
              <h3 className="course--add--title">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 13 13"
                  className="add"
                >
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>
                New Course
              </h3>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
