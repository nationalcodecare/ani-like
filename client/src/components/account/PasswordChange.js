import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { Field, reset, reduxForm, propTypes } from 'redux-form';

// Actions
import { changePassword } from '../../actions/accountManagement';
// Utils
import Spinner from '../utils/Spinner';
import store from '../../store';

// Render input element for Field
const renderInput = ({ input }) => {
  return (
    <input
      className="form__input account__input"
      {...input}
      type="password"
      placeholder={input.name}
      required={true}
      minLength={8}
    />
  );
};

const PasswordChange = ({
  handleSubmit,
  changePassword,
}) => {
  const [updated, setUpdated] = useState(false);

  const onSubmit = async (formValues) => {
    setUpdated(true);
    await changePassword(formValues);
    setUpdated(false);
  };

  const renderForm = () => {
    if (updated) {
      return <Spinner />;
    }

    return (
      <div className="user-password">
        <h2 className="sign-up__heading color-dark account__header">
          Change Password
        </h2>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Field name="currentPassword" component={renderInput} />
          <Field name="password" component={renderInput} />
          <Field name="confirmPassword" component={renderInput} />

          <button className="form__btn account__btn2" data-testid="password-change-btn">Change Password</button>
        </form>
      </div>
    );
  };

  return renderForm();
};

PasswordChange.propTypes = {
  ...propTypes,
  changePassword: PropTypes.func.isRequired,
};

const formWrapped = reduxForm({
  form: 'passwordChange',
  onSubmitSuccess: () => {store.dispatch(reset('passwordChange'))},
})(PasswordChange);

export default connect(null, { changePassword })(
  formWrapped
);
