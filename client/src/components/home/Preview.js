import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Utils
import Spinner from '../utils/Spinner';

const Preview = ({ isAuthorized, loading, user }) => {
  const renderUser = () => {
    if (loading) {
      return <Spinner />;
    }

    if (isAuthorized) {
      return (
        <div data-testid="preview-user" className="user full-width">
          <Link to="/me" className="user__link">
            <figure className="user__shape">
              <img
                src={`https://anime-like-bucket.s3.us-east-2.amazonaws.com/users/${user.photo}`}
                alt="User icon"
                className="user__img"
              />
            </figure>
          </Link>
        </div>
      );
    }

    return (
      <Link to="/login" className="btn-login">
        Log in
      </Link>
    );
  };

  return (
    <Fragment>
      <div id="preview" className="preview">
        <nav className="preview__nav">
          <Link to="/" className="preview__logo">
            <img
              src={require('../../styles/img/premiumlogo/logo.png')}
              alt="logo"
              className="preview__icon"
            />
          </Link>

          <ul className="preview__list">
            <li className="preview__item">{renderUser()}</li>
          </ul>
        </nav>

        <div className="preview__block">
          <div className="preview__flexing">
            <h1 className="heading-1">Start watching now!</h1>
            <p className="preview__text">
              <Link to="/" className="preview__aniLike">
                aniLike
              </Link>
              - webpage, where you can find all anime!
            </p>
            <Link to="/titles" className="btn btn--play">
              Watch
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Preview.propTypes = {
  isAuthorized: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.object,
};

export default React.memo(Preview);
