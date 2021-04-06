import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// utils
import { cut } from '../utils/functions';

const AccountCard = ({ title, titlesLoading }) => {
  if (titlesLoading) {
    return (
      <Link to="#" className="account-top-card sceletion">
        <div className="account-card">
          <div className="account-card__side"></div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/titles/${title._id}`}
      className="account-top-card"
      data-testid="account-card"
    >
      <div className="account-card">
        <div className="account-card__side">
          <img
            src={`https://anime-like-bucket.s3.us-east-2.amazonaws.com/titles/${title.image}`}
            alt={title.name}
            className="account-card__image"
            data-testid="account-card-img"
          />
          <h3 className="account-card__heading">{cut(title.name, 10)}</h3>
        </div>
      </div>
    </Link>
  );
};

AccountCard.propTypes = {
  title: PropTypes.object.isRequired,
};

export default AccountCard;
