import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Poster = () => {
  return (
    <Fragment>
      <section className="section-poster">
        <div className="heading">
          {/* <!-- HEADER POSTER --> */}
          <h2 className="heading-2">Direct From Japan to You</h2>
          <p>
            Japanese manga merchandise is the most popular way that most fans
            take to either feel closer to their favourite characters or learn
            more about the Japanese culture.
          </p>
        </div>
        {/* <!-- POSTER CARDS --> */}
        <div className="posters">
          {/* <!-- CARD 1 --> */}
          <div className="posters__card">
            <svg className="posters__icon">
              <use
                xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-eye`}
              ></use>
            </svg>
            <h4 className="posters__header heading-4">Watch for free!</h4>
            <p className="posters__text">
              You can{' '}
              <Link to="showsList.html" className="posters__link">
                watch
              </Link>{' '}
              any anime title without paying any fund. Just press the button and
              get plesure!
            </p>
          </div>
          {/* <!-- CARD 2 --> */}
          <div className="posters__card">
            <svg className="posters__icon">
              <use
                xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-menu_book`}
              ></use>
            </svg>
            <h4 className="posters__header heading-4">Buy manga</h4>
            <p className="posters__text">
              Looking for your new favourite book?{' '}
              <Link to="#" className="posters__link">
                Browse
              </Link>{' '}
              some of our top categories!
            </p>
          </div>
          {/* <!-- CARD 3 --> */}
          <div className="posters__card">
            <svg className="posters__icon">
              <use
                xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-map`}
              ></use>
            </svg>
            <h4 className="posters__header heading-4">Go visit Japan</h4>
            <p className="posters__text">
              If you are the "anime lover" - go visit Japan right now! Just{' '}
              <Link to="#" className="posters__link">
                buy
              </Link>{' '}
              tickets on our site with 20% discount.
            </p>
          </div>
          {/* <!-- CARD 4 --> */}
          <div className="posters__card">
            <svg className="posters__icon">
              <use
                xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-cancel_schedule_send`}
              ></use>
            </svg>
            <h4 className="posters__header heading-4">No advertising!</h4>
            <p className="posters__text">
              Nowadays it's hard to watch your favourite anime<span>/</span>
              serial<span>/</span>movie without advert. Watch anime on our
              webpage withou it!.
            </p>
          </div>
          {/* <!-- CARD 5 --> */}
          <div className="posters__card">
            <svg className="posters__icon">
              <use
                xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-chat`}
              ></use>
            </svg>
            <h4 className="posters__header heading-4">Go chat</h4>
            <p className="posters__text">
              We have live-chat for you.{' '}
              <Link to="/" className="posters__link">
                go and chat
              </Link>{' '}
              with others people.
            </p>
          </div>
          {/* <!-- CARD 6 --> */}
          <div className="posters__card">
            <svg className="posters__icon">
              <use
                xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-add_shopping_cart`}
              ></use>
            </svg>
            <h4 className="posters__header heading-4">Wanna more?</h4>
            <p className="posters__text">
              If you want more functions, just buy Premium. Read
              <Link to="#" className="posters__link">
              {' '}here
              </Link>{' '}
              about it!
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default React.memo(Poster);
