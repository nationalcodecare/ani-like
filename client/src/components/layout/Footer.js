import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // console.log('Footer Re_Render')
  
  return (
    <footer id="footer" className="footer">
      <div className="up-row">
        {/* <!-- LOGO --> */}
        <div className="up-row__logo">
          <img src={require('../../styles/img/premiumlogo/logo.png')} alt="logo" className="up-row__icon" />
        </div>
        {/* <!-- LISTS --> */}
        <ul className="up-row__list">
          <li className="up-row__item">Two-Week Free Trial</li>
          <li className="up-row__item">Compare Plans</li>
          <li className="up-row__item">Gift Memberships</li>
          <li className="up-row__item">Redeem Crunchyroll</li>
          <li className="up-row__item">VRV Gift Card</li>
        </ul>
        <ul className="up-row__list">
          <li className="up-row__item">Membership</li>
          <li className="up-row__item">Donate</li>
          <li className="up-row__item">Premium policy</li>
          <li className="up-row__item">Join team</li>
          <li className="up-row__item">Administation</li>
        </ul>
        <ul className="up-row__list">
          <li className="up-row__item">About</li>
          <li className="up-row__item">Jobs</li>
          <li className="up-row__item">Advertising</li>
          <li className="up-row__item">Personal information</li>
          <li className="up-row__item">Contact us</li>
        </ul>
        {/* <!-- Social networks --> */}
        <ul className="up-row__list up-row__links">
          <li className="up-row__item">
            <svg className="up-row__link">
              <use xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-vk-alternitive`}></use>
            </svg>
          </li>
          <li className="up-row__item">
            <svg className="up-row__link">
              <use xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-facebook`}></use>
            </svg>
          </li>
          <li className="up-row__item">
            <svg className="up-row__link">
              <use xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-instagram`}></use>
            </svg>
          </li>
          <li className="up-row__item">
            <svg className="up-row__link">
              <use xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-linkedin`}></use>
            </svg>
          </li>
          <li className="up-row__item">
            <svg className="up-row__link">
              <use xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-twitter`}></use>
            </svg>
          </li>
        </ul>
      </div>
      <div className="footer__text">
        <p className="footer__copy">
          Brought to you by Madman Anime viewer Alex Belz. ABN 50 615 305 587.
          Level 2, 289 Wellington Parade South, Australia. &copy;aniLike &trade;
          2020
        </p>
        <ul className="footer__list">
          <li className="footer__item">
            <Link to="/" className="footer__link">
              Terms of Use
            </Link>
          </li>
          <li className="footer__item">
            <Link to="/" className="footer__link">
              Privacy Policy
            </Link>
          </li>
          <li className="footer__item">
            <Link to="/" className="footer__link">
              Cookie Policy
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
