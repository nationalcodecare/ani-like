import React from 'react';
import PropTypes from 'prop-types';
import { HashLink as Link } from 'react-router-hash-link';

// Redux
import { connect } from 'react-redux';

const Navigation = ({ auth }) => {
  // console.log('Navigation Re_Render')


  const isAuthorized = auth.isAuthorized;

  const renderItem = (from, to, number, text, defaultText) => {
    if (isAuthorized) {
      return (
        <Link to={from} className="navigation__link">
          <span>{number}</span>
          {defaultText}
        </Link>
      );
    }
    return (
      <Link
        to={to}
        className="navigation__link"
        onClick={() => (document.getElementById('navi-toggle').checked = false)}
      >
        <span>{number}</span>
        {text}
      </Link>
    );
  };

  return (
    <div className="navigation">
      <input
        type="checkbox"
        className="navigation__checkbox"
        id="navi-toggle"
      />

      <label htmlFor="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>

      <div className="navigation__background">&nbsp;</div>
      <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link to="/" className="navigation__link">
              <span>01</span>Home Page
            </Link>
          </li>
          <li className="navigation__item">
            {renderItem('/me', '/login', '02', 'Login', 'Profile')}
          </li>
          <li className="navigation__item">
            {renderItem('/', '/#sign-up', '03', 'Sign Up', 'Premium')}
          </li>
          <li className="navigation__item">
            <Link to="/" className="navigation__link">
              <span>04</span>Buy Manga
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/" className="navigation__link">
              <span>05</span>About Anilike
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Navigation.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Navigation);
