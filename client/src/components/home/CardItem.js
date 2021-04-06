import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Filter text length
import { cut } from '../utils/functions';

const CardItem = ({ title }) => {
  if (!title) {
    return (
      <div className="top-card">
        <div className="card" data-testid="card">
          {/* <!-- FRONT SIDE --> */}
          <div className="card__side card__side--front sceletion">
            <div className="card__info">
              <p className="card__text sceletion sceletion__avg-line">&nbsp;</p>
              <p className="card__dubs sceletion sceletion__line">&nbsp;</p>
            </div>
          </div>
          {/* <!-- BACK SIDE --> */}
          <div className="card__side card__side--back">
            <div
              className="card__desc sceletion sceletion__desc"
              style={{ width: '100%' }}
            >
              &nbsp;
            </div>
            {/* <!-- INFO + BUTTON --> */}
            <div className="card__info-back">
              {/* <!-- TEXT BLOCK --> */}
              <h3 className="card__heading-back sceletion sceletion__avg-line">
                &nbsp;
              </h3>
              <p className="card__dubs card__dubc-back sceletion sceletion__line">
                &nbsp;
              </p>
              {/* <!-- BUTTON WATCH --> */}
              <Link to="#" className="card__btn btn-link">
                Watch now&rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="top-card">
      <div className="card" data-testid="card">
        {/* <!-- FRONT SIDE --> */}
        <div className="card__side card__side--front">
          <img
            // src={require(`../../styles/img/${title.image}`)}
            src={`https://anime-like-bucket.s3.us-east-2.amazonaws.com/titles/${title.image}`}
            alt={title.name}
            className="card__image"
            data-testid="home-card"
          />
          <h3 className="card__heading">{title.name}</h3>
          <div className="card__info">
            <p className="card__text">
              {title.class} &bull; {title.aired} &bull; {title.episodes}{' '}
              episodes
            </p>
            <p className="card__dubs">
              <span>sub</span>
              <span>dub</span>
            </p>
          </div>
        </div>
        {/* <!-- BACK SIDE --> */}
        <div className="card__side card__side--back">
          <div className="card__desc">{cut(title.description, 155)}</div>
          {/* <!-- INFO + BUTTON --> */}
          <div className="card__info-back">
            {/* <!-- TEXT BLOCK --> */}
            <h3 className="card__heading-back">{title.name}</h3>
            <p className="card__par-back">
              {title.class} &bull; {title.aired} &bull; {title.episodes}{' '}
              episodes
            </p>
            <p className="card__dubs card__dubs-back">
              <span>sub</span>
              <span>dub</span>
            </p>
            {/* <!-- BUTTON WATCH --> */}
            <Link to={`/titles/${title._id}`} className="card__btn btn-link">
              Watch now&rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

CardItem.defaultProps = {
  title: null,
}

CardItem.propTypes = {
  title: PropTypes.object,
};

export default CardItem;
