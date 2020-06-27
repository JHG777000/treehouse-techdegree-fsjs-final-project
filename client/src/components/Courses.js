import React from 'react';

export default class Courses extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: undefined,
    };
  }
  componentDidMount() {

  }
  componentDidUpdate() {
    this.performQuery();
  }

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
    const Box = (props) => {
      const results = props.data;
      let boxes = undefined;
      if (results !== undefined && results.length > 0) {
        boxes = results.map((box) => <h2> {box.title} </h2>);
      }
      return <div>{boxes}</div>;
    };
    return (
      <div>
        <h1> FSJS project 10 Courses </h1>
        <Box data={this.state.courses} />
      </div>
    );
  }
}
