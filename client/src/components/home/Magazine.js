import React from 'react';
import { Link } from 'react-router-dom';

const Magazine = () => {
  return (
    <section className="section-info">
      <div className="anime__prev">&nbsp;</div>
      <div className="anime__info">
        <h1 className="anime__heading heading-1">Tired from work?</h1>
        <p className="anime__par">
          Not only are your energy levels low, but so is your motivation. When
          we’re fatigued like this, it can make it difficult to concentrate and
          stay organized. And when it lasts for days or weeks, despite adequate
          sleep, it can leave you feeling anxious, depressed, and on the road to
          burnout. Anyone can feel tired at work. It’s when those feelings of
          tiredness persist that you need to take action. Just go to watch our
          free anime titles right now!
        </p>
        <Link to="/titles" className="btn-link anime__button">
          Watch now &rarr;
        </Link>
      </div>

      <div className="manga__info">
        <h1 className="manga__heading heading-1">Read our manga</h1>
        <div className="manga__shop">
          <div className="manga__video">
            <div className="bg-video">
              <video data-testid="magazine-video" className="bg-video__content" autoPlay muted loop>
                <source
                  src={require('../../styles/img/book-read.mp4')}
                  type="video/mp4"
                />
                Your browser does nor support this video format
              </video>
            </div>
          </div>
          <div className="manga__item manga__item--1">
            <svg className="manga__icon">
              <use
                xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-add_shopping_cart`}
              ></use>
            </svg>
            <p>
              Visit our newly created <Link to="/">Shop!</Link>
            </p>
          </div>
          <div className="manga__item manga__item--2">
            <svg className="manga__icon">
              <use
                xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-key`}
              ></use>
            </svg>
            <p>Free yourself from boring days</p>
          </div>
        </div>
      </div>
      <div className="manga__prev">&nbsp;</div>

      <div className="mobile__image">&nbsp;</div>
      <div className="mobile__content">
        <h1 className="heading-1">
          AniLike on <span>mobile</span>
        </h1>
        <p className="anime__par">
          Download our mobile app everywhere! Just click the link below and
          watch newly updated title, read manga and do all the same things from
          mobile as in browser
        </p>
        <ul className="mobile__links">
          <li className="mobile__item">
            <img
              src={require('../../styles/img/apps-btn-google.png')}
              alt="google play"
              className="mobile__link"
            />
          </li>
          <li className="mobile__item">
            <img
              src={require('../../styles/img/apps-btn-samsung.png')}
              alt="google play"
              className="mobile__link"
            />
          </li>
          <li className="mobile__item">
            <img
              src={require('../../styles/img/apps-btn-apple.png')}
              alt="google play"
              className="mobile__link"
            />
          </li>
          <li className="mobile__item">
            <img
              src={require('../../styles/img/apps-btn-xbox.png')}
              alt="google play"
              className="mobile__link"
            />
          </li>
        </ul>
        <Link to="/" className="mobile__btn btn-link">
          Download
        </Link>
      </div>
    </section>
  );
};

export default React.memo(Magazine);
