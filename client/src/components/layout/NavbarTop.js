import React from 'react';
import PropTypes from 'prop-types';
import { HashLink as Link } from 'react-router-hash-link';
// Redux
import { connect } from 'react-redux';
// Utils
import { cut } from '../utils/functions';
import SearchTitle from './search/SearchTitle';

export const NavbarTop = ({ auth, setSearched }) => {
  const user = auth.user;
  const loading = auth.loading;
  const isAuthorized = auth.isAuthorized;

  const renderUser = () => {
    if (loading) {
      return (
        <Link to="#" className="user__link">
          <figure className="user__shape sceletion">&nbsp;</figure>
          <div className="user__text user__home">
            <div className="sceletion sceletion__line">&nbsp;</div>
          </div>
        </Link>
      );
    } else if (isAuthorized) {
      return (
        <div className="user margin-left-small">
          <Link to="/me" className="user__link">
            <figure className="user__shape">
              <img
                src={`https://anime-like-bucket.s3.us-east-2.amazonaws.com/users/${user.photo}`}
                alt="User avatar"
                className="user__img"
              />
            </figure>
            <div className="user__text user__home">{cut(user.name, 9)}</div>
          </Link>
        </div>
      );
    }

    // Buttons
    return (
      <div className="user">
        <Link to="/login" className="login">
          <svg className="user__icon">
            <use
              xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-person`}
            ></use>
          </svg>
          <span>Log in</span>
        </Link>
        <Link to="/#sign-up" className="signup">
          <svg className="user__icon">
            <use
              xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-person_add`}
            ></use>
          </svg>
          <span>Sign up</span>
        </Link>
      </div>
    );
  };
  return (
    <nav className="navbar">
      <div className="flex-container navbar__container">
        <div className="navbar__row">
          <Link to="/" className="navbar__logo">
            <img
              src={require('../../styles/img/premiumlogo/logo.png')}
              alt="Logo"
              className="navbar__image"
            />
          </Link>
          {renderUser()}
          <SearchTitle setSearched={setSearched} />
        </div>
      </div>
    </nav>
  );
};

NavbarTop.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(NavbarTop);
