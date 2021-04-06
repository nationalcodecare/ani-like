import React from 'react';
import PropTypes from 'prop-types';
import BookmarkList from './BookmarkList';

// import LazyImage from '../../utils/LazyImage';

const AnimeTitle = ({ user, currentTitle }) => {
  if (!currentTitle.hasOwnProperty('_id')) {
    return (
      <div className="show title">
        <div className="show__image sceletion">&nbsp;</div>
        <div className="title__information">
          <div className="show__info title__info">
            <div className="show__header-rating">
              <h2 className="show__header sceletion sceletion__avg-line">
                &nbsp;
              </h2>
            </div>
            <p className="show__desc sceletion sceletion__desc">&nbsp;</p>
            <div className="show__bookmarks-btn">
              <ul className="show__bookmarks">
                <li className="title__item sceletion sceletion__avg-line">
                  &nbsp;
                </li>
              </ul>
            </div>
          </div>
          <div className="title__details">
            <ul className="title__list sceletion__list sceletion__avg-line">
              <li className="title__item sceletion sceletion__avg-line">
                &nbsp;
              </li>
              <li className="title__item sceletion sceletion__avg-line">
                &nbsp;
              </li>
              <li className="title__item sceletion sceletion__avg-line">
                &nbsp;
              </li>
              <li className="title__item sceletion sceletion__avg-line">
                &nbsp;
              </li>
              <li className="title__item sceletion sceletion__avg-line">
                &nbsp;
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  // Image src
  const currentImageSrc = `https://anime-like-bucket.s3.us-east-2.amazonaws.com/titles/${currentTitle.image}`;
  const renderTitleOptions = () => {
    if (user) {
      return <BookmarkList user={user} id={currentTitle._id} />;
    }
    return;
  };

  return (
    <div className="show title">
      <div className="show__image title__image">
        <img
          src={currentImageSrc}
          alt={currentTitle.name}
          className="show__img"
        />
        <div className="show__subs">
          <div className="show__dubs">
            <span>sub</span>
            <span>dub</span>
          </div>
          <p className="show__text">
            {currentTitle.class} &bull; {currentTitle.episodes} episodes
          </p>
        </div>
      </div>
      <div className="title__information">
        <div className="show__info title__info">
          <div className="show__header-rating">
            <h2 className="show__header title__header">{currentTitle.name}</h2>
          </div>
          <p data-testid="title-desc-sp" className="show__desc">
            {currentTitle.description}
          </p>
          <div className="show__bookmarks-btn">
            {renderTitleOptions()}
            <div className="show__rating">
              <span>{currentTitle.rating}</span>
              <svg className="show__icon show__star">
                <use
                  xlinkHref={`${require('../../../styles/img/sprite.svg')}#icon-star`}
                ></use>
              </svg>
            </div>
          </div>
        </div>
        <div className="title__details">
          <ul className="title__list">
            <li className="title__item">
              <span>Season:</span> {currentTitle.seasons.join(', ')}
            </li>
            <li className="title__item">
              <span>Genre:</span> {currentTitle.genre.join(', ')}
            </li>
            <li className="title__item">
              <span>Year:</span> {currentTitle.aired}
            </li>
            <li className="title__item">
              <span>Author:</span> {currentTitle.author}
            </li>
            <li className="title__item">
              <span>License:</span> {currentTitle.license}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

AnimeTitle.propTypes = {
  user: PropTypes.object,
  currentTitle: PropTypes.object.isRequired,
};

export default AnimeTitle;
