import React from 'react';
import { Redirect } from 'react-router-dom';

const DeleteCourse = (props) => {
  const user = props.utility().getUser();
  const getAuth = props.utility().getAuth;
  fetch(
    'http://localhost:5000/api/courses/' + props.match.params.id,
    getAuth(user, 'DELETE')
  ).catch((error) => {
    console.log('Error deleting course data', error);
  });

  return <Redirect to="/" />;
};

export default DeleteCourse;
