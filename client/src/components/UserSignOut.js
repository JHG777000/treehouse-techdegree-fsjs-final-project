import React from 'react';
import { Redirect } from 'react-router-dom';

const UserSignOut = (props) => {
    const authUser = props.utility().signOut();
    return (
      <Redirect to="/" />
    );
  }

  export default UserSignOut;