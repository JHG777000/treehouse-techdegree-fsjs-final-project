import React from 'react';

const UserSignOut = (props) => {
    const authUser = props.utility().signOut();
    return (
      <Redirect to="/" />
    );
  }

  export default Header;