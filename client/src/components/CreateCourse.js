import React from 'react';

export default class CreateCourse extends React.Component {
  constructor() {
    super();
    this.state = {
      
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

    return (
      <div>
        
      </div>
    );
  }
}
