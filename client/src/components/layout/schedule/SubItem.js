import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SubItem = ({ title }) => {
  return (
    <Link to={`/titles/${title._id}`} className="schedule__titles-item">
      <figure className="schedule__shape avatar">
        <img
          className="schedule__img"
          src={`https://anime-like-bucket.s3.us-east-2.amazonaws.com/titles/${title.image}`}
          alt={title.name}
        />
      </figure>
      <div className="schedule__text">
        {title.name} <span>({title.onGoing.time})</span>
      </div>
    </Link>
  );
};

SubItem.propTypes = {
  title: PropTypes.object.isRequired,
};

export default SubItem;
