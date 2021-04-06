import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
// Actions
import { logout } from '../../actions/auth';

const SideBar = ({ logout }) => {

  const onLogoutClick = async () => {
    await logout();
  };

  return (
    <div className="sidebar">
      <ul className="sidebar__options">
        <Link to="/" className="sidebar__link">
          <svg className="sidebar__icon">
            <use
              xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-home`}
            ></use>
          </svg>
          <span className="sidebar__text">Home</span>
        </Link>
        <Link to="/me" className="sidebar__link">
          <svg className="sidebar__icon">
            <use
              xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-person`}
            ></use>
          </svg>
          <span className="sidebar__text">Profile</span>
        </Link>
        <Link to="/me/favourites" className="sidebar__link">
          <svg className="sidebar__icon">
            <use
              xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-favorite`}
            ></use>
          </svg>
          <span className="sidebar__text">Favourites</span>
        </Link>
        <Link to="/me/currentlyWatching" className="sidebar__link">
          <svg className="sidebar__icon">
            <use
              xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-eye`}
            ></use>
          </svg>
          <span className="sidebar__text">Current</span>
        </Link>
        <Link to="/me/completed" className="sidebar__link">
          <svg className="sidebar__icon">
            <use
              xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-playlist_add_check`}
            ></use>
          </svg>
          <span className="sidebar__text">Completed</span>
        </Link>
        <Link to="/me/planned" className="sidebar__link">
          <svg className="sidebar__icon">
            <use xlinkHref="img/sprite.svg#icon-playlist_add"></use>
            <use
              xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-playlist_add`}
            ></use>
          </svg>
          <span className="sidebar__text">Planned</span>
        </Link>
        <Link to="/me/onHold" className="sidebar__link">
          <svg className="sidebar__icon">
            <use
              xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-attach_file`}
            ></use>
          </svg>
          <span className="sidebar__text">On Hold</span>
        </Link>
        <Link to="/me/dropped" className="sidebar__link sidebar__last">
          <svg className="sidebar__icon">
            <use
              xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-cancel_schedule_send`}
            ></use>
          </svg>
          <span className="sidebar__text">Dropped</span>
        </Link>
        <Link to="/" className="sidebar__link">
          <svg className="sidebar__icon">
            <use xlinkHref="img/sprite.svg#icon-add_shopping_cart"></use>
            <use
              xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-add_shopping_cart`}
            ></use>
          </svg>
          <span className="sidebar__text">Premium</span>
        </Link>
        <Link to="/me/comments" className="sidebar__link sidebar__last">
          <svg className="sidebar__icon">
            <use
              xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-chat`}
            ></use>
          </svg>
          <span className="sidebar__text">Comments</span>
        </Link>
        <div onClick={() => onLogoutClick()} className="sidebar__link logout">
          <svg className="sidebar__icon">
            <use
              xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-backspace`}
            ></use>
          </svg>
          <span className="sidebar__text">Log out</span>
        </div>
      </ul>
    </div>
  );
};

SideBar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(React.memo(SideBar));
