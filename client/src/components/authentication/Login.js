import React, { Fragment, useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form';
// Action
import { login, forgotPassword } from '../../actions/auth';
import setAlert from '../../actions/alert';
// Utils
import Spinner from '../utils/Spinner';
import { loadingProcess } from '../utils/functions';
import Navigation from '../layout/Navigation';
import GoogleAuth from './GoogleAuth';

//render input for Field
const renderInput = ({ input }) => {
  const className = 'form__input';

  return (
    <Fragment>
      <input
        type={input.name}
        className={className}
        {...input}
        placeholder={input.name}
      />
    </Fragment>
  );
};

// Actual JSX
const Login = ({
  auth,
  handleSubmit,
  submitting,
  login,
  forgotPassword,
  setAlert,
  globalMessages,
}) => {
  const [forgotForm, setForgotForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.status) {
      setAlert(auth.message, auth.status);
    } else if (globalMessages.status) {
      setAlert(globalMessages.message, globalMessages.status);
    }
  }, [auth, setAlert, globalMessages]);

  const options = () => {
    if (loading) {
      return <></>;
    }

    return (
      <div className="login-form__options">
        {forgotForm ? (
          <button  data-testid="forgot-pass-btn" className="form__btn">Send mail &rarr;</button>
        ) : (
          <button data-testid="login-btn" className="form__btn">Log in &rarr;</button>
        )}
        {forgotForm ? (
          <Fragment></Fragment>
        ) : (
          <Link to="/#sign-up" className="preview__aniLike login-form__btn">
            Sign up
          </Link>
        )}
      </div>
    );
  };

  // Login form
  const onSubmit = async (formValues) => {
    await login(formValues);
  };

  // Forgot password form
  const onForgotPasswordSubmit = async ({ email }) => {
    await forgotPassword(email);
  };

  const renderForm = () => {
    if (forgotForm) {
      return (
        <Fragment>
          <h2 className="sign-up__heading">Restore Password</h2>
          <form
            onSubmit={handleSubmit(onForgotPasswordSubmit)}
            className="form"
          >
            <Field name="email" component={renderInput} />
            {loadingProcess(submitting, <Spinner />, options())}
          </form>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <h2 className="sign-up__heading">Log in</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <Field name="email" component={renderInput} />
          <Field name="password" component={renderInput} />
          {loadingProcess(submitting, <Spinner />, options())}
        </form>
        <p onClick={() => setForgotForm(true)} className="login-form__forgot">
          Forgot password?
        </p>
        <GoogleAuth loading={loading} setLoading={setLoading}/>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Navigation />
      <div className="login-playback">
        <div className="login-form">{renderForm()}</div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  ...propTypes,
  auth: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  globalMessages: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { auth: state.auth, globalMessages: state.globalMessages };
};

const formWrapped = reduxForm({ form: 'loginForm' })(Login);

export default connect(mapStateToProps, { login, forgotPassword, setAlert })(
  formWrapped
);
