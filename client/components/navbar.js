import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <Fragment>
    <nav className="ui large menu">
      <div className="ui medium header item">
        <Link to="/home">Home</Link>
      </div>
      {isLoggedIn ? (
        <div className="right menu item">
          {/* The navbar will show these links after you log in */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="right menu">
          {/* The navbar will show these links before you log in */}
          <div className="item">
            <Link to="/login">
              <span className="ui teal button">Login</span>
            </Link>
          </div>
          <div className="item">
            <Link to="/signup">
              <span className="ui grey button">Sign Up</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  </Fragment>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
