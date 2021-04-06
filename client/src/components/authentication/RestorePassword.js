import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form';
// Action
import { restorePassword } from '../../actions/auth';
import setAlert from '../../actions/alert';
// Utils
import Spinner from '../utils/Spinner';
import { loadingProcess } from '../utils/functions';
import Navigation from '../layout/Navigation';

//render input for Field
const renderInput = ({ input }) => {
  const className = 'form__input';

  return (
    <Fragment>
      <input
        type="password"
        className={className}
        {...input}
        placeholder={input.name}
      />
    </Fragment>
  );
};

// Actual JSX
const RestorePassword = ({
  auth,
  handleSubmit,
  submitting,
  restorePassword,
  setAlert,
  globalMessages,
}) => {
  useEffect(() => {
    if (auth.status) {
      setAlert(auth.message, auth.status);
    } else if (globalMessages.status) {
      setAlert(globalMessages.message, globalMessages.status);
    }
  }, [auth, setAlert, globalMessages]);

  // Login form
  const onSubmit = async (formValues) => {
    await restorePassword(formValues);
  };

  const renderForm = () => {
    return (
      <Fragment>
        <h2 className="sign-up__heading">New Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <Field name="password" component={renderInput} />
          <Field name="confirmPassword" component={renderInput} />
          {loadingProcess(
            submitting,
            <Spinner />,
            <button className="form__btn">Restore password</button>
          )}
        </form>
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

RestorePassword.propTypes = {
  ...propTypes,
  auth: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  restorePassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  globalMessages: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { auth: state.auth, globalMessages: state.globalMessages };
};

const formWrapped = reduxForm({ form: 'restorePasswordForm' })(RestorePassword);

export default connect(mapStateToProps, { restorePassword, setAlert })(
  formWrapped
);
