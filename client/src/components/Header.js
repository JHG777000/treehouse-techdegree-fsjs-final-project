import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    const authUser = props.utility().authenticatedUser();
    return (
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>
            {authUser ? (
              <Fragment>
                <span>Welcome, {authUser.firstName}!</span>
                <Link to="/signout">Sign Out</Link>
              </Fragment>
            ) : (
              <Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </Fragment>
            )}
          </nav>
        </div>
      </div>
    );
  }

  export default Header;