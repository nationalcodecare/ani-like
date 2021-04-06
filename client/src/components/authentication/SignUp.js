import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form';
// Action
import { register } from '../../actions/auth';
import setAlert from '../../actions/alert';
// Utils
import Spinner from '../utils/Spinner';
import { loadingProcess } from '../utils/functions';

// render input for Field
const renderInput = ({ input }) => {
  const className = 'form__input';

  return (
    <Fragment>
      <input
        type={input.name === 'confirmPassword' ? 'password' : input.name}
        className={className}
        {...input}
        placeholder={input.name}
      />
    </Fragment>
  );
};

const SignUp = ({ auth, handleSubmit, submitting, register, setAlert }) => {
  const [isMessage, setIsMessage] = useState(false);

  useEffect(() => {
    if (isMessage && auth.status !== null) {
      setAlert(auth.message, auth.status);
      setIsMessage(false);
    }
  }, [setAlert, auth, isMessage, setIsMessage]);

  const options = () => {
    return <button data-testid="register-btn" className="form__btn">Next &rarr;</button>;
  };

  const onSubmit = async (formValues) => {
    setIsMessage(true);
    await register(formValues);
  };

  return (
    <section id="sign-up" className="section-signup">
      <div className="section-signup__image">&nbsp;</div>
      <div className="sign-up">
        <h2 className="sign-up__heading">Sign up right now</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <Field name="name" component={renderInput} />
          <Field name="email" component={renderInput} />
          <Field name="password" component={renderInput} />
          <Field name="confirmPassword" component={renderInput} />

          {loadingProcess(submitting, <Spinner />, options())}
        </form>
      </div>
    </section>
  );
};

SignUp.propTypes = {
  ...propTypes, 
  auth: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const formWrapped = reduxForm({ form: 'registerForm' })(SignUp);

export default connect(mapStateToProps, { register, setAlert })(formWrapped);
