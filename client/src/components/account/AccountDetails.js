import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Components
import PasswordChange from './PasswordChange';
import AccountDelete from './AccountDelete';
import Spinner from '../utils/Spinner';
import PhotoInput from './PhotoInput';
// Actions
import { changeDetails } from '../../actions/accountManagement';

const AccountDetails = ({ auth, changeDetails }) => {
  const [photo, setPhoto] = useState(auth.user.photo);
  const [name, setName] = useState(auth.user.name);
  const [email, setEmail] = useState(auth.user.email);
  const [updated, setUpdated] = useState(false);


  const onSubmit = async (e) => {
    e.preventDefault();
    setUpdated(true);

    const form = new FormData();

    form.append('name', name);
    form.append('email', email);
    form.append('photo', photo);

    await changeDetails(form);
    setUpdated(false);
  };

  const renderUserDetails = () => {
    if (auth.loading || updated) {
      return <Spinner />;
    }
    return (
      <div className="user-data">
        <h2 className="sign-up__heading account__header">
          Your account details
        </h2>
        <form onSubmit={onSubmit} className="form">
          <input
            name="name"
            type="text"
            className="form__input account__input"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            name="email"
            type="email"
            className="form__input account__input"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <PhotoInput setPhoto={setPhoto} preview={auth.user.photo} />

          <button id="save-changes" data-testid="save-acc-details" className="form__btn account__btn2">
            Save Changes
          </button>
        </form>
      </div>
    );
  };

  return (
    <Fragment>
      {renderUserDetails()}
      <PasswordChange />
      <AccountDelete />
    </Fragment>
  );
};

AccountDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  changeDetails: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { changeDetails })(
  AccountDetails
);
