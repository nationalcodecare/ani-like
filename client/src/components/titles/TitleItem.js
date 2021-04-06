import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TitleItem = ({ title, titleLoading }) => {
  if (titleLoading || !title.hasOwnProperty('_id')) {
    return (
      <div className="show">
        <div className="show__image sceletion">&nbsp;</div>
        <div className="show__info">
          <div className="show__header-rating">
            <h2 className="show__header sceletion sceletion__line">&nbsp;</h2>
          </div>
          <p className="show__desc sceletion sceletion__desc">&nbsp;</p>
          <div className="show__bookmarks-btn">
            <a href="show.html" className="btn-link show__button">
              Watch
            </a>
          </div>
        </div>
        <div className="show__shape">&nbsp;</div>
      </div>
    );
  }

  return (
    <div className="show" data-testid="show-title">
      {/* <!-- show image --> */}
      <div className="show__image">
        <img
          src={`https://anime-like-bucket.s3.us-east-2.amazonaws.com/titles/${title.image}`}
          alt={title.name}
          className="show__img"
        />
        <div className="show__subs">
          <div className="show__dubs">
            <span>sub</span>
            <span>dub</span>
          </div>
          <p className="show__text">
            {title.class} &bull; {title.aired} &bull; {title.episodes} episodes
          </p>
        </div>
      </div>
      {/* <!-- show info --> */}
      <div className="show__info">
        <div className="show__header-rating">
          <h2 className="show__header">{title.name}</h2>
          <div className="show__rating">
            <span>{title.rating}</span>
            <svg className="show__icon show__star">
              <use
                xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-star`}
              ></use>
            </svg>
          </div>
        </div>
        {/* <!-- show desc --> */}
        <p data-testid="title-description-main" className="show__desc">
          {title.description}
        </p>
        {/* <!-- show bookmarks + button --> */}
        <div className="show__bookmarks-btn">
          {/* <!-- button --> */}
          <Link to={`/titles/${title._id}`} className="btn-link show__button">
            Watch
          </Link>
        </div>
      </div>
      {/* <!-- show shape --> */}
      <div className="show__shape">&nbsp;</div>
    </div>
  );
};

TitleItem.propTypes = {
  title: PropTypes.object.isRequired,
  titleLoading: PropTypes.bool.isRequired,
};

export default TitleItem;
