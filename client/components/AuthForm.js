import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="ui placeholder segment container">
        <div className="column">
          <form className="ui form" onSubmit={handleSubmit} name={name}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <div className="ui left icon input">
                <input type="text" placeholder="Email Address" name="email" />
                <i aria-hidden="true" className="user icon" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="ui left icon input">
                <input name="password" type="password"  />
                <i aria-hidden="true" className="lock icon" />
              </div>
            </div>
            <button className="ui primary button" type='submit'>{displayName}</button>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          {displayName === 'Login' && <a href="/auth/instagram" className="ui center aligned button segment">{displayName} with Instagram</a>}
        </div>
      </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
