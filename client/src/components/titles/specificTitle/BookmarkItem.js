import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Actions
import { updateCollection } from '../../../actions/accountManagement';

const BookmarkItem = ({ collection, id, updateCollection }) => {
  if (!collection || !id) {
    return <Fragment></Fragment>;
  }

  const onCollectionClick = async (e) => {
    let data = {};

    e.stopPropagation();
    if (e.target.classList.contains('show__icon')) {
      e.target.classList.toggle('in-collection');
      data.message = `${
        e.target.classList.contains('in-collection')
          ? 'Added to'
          : 'Removed from'
      } ${Object.keys(collection)[0]}`;
    } else {
      e.target.parentElement.classList.toggle('in-collection');
      data.message = `${
        e.target.parentElement.classList.contains('in-collection')
          ? 'Added to'
          : 'Removed from'
      } ${Object.keys(collection)[0]}`;
    }

    data[`${Object.keys(collection)[0]}`] = id;
    await updateCollection(data);
  };

  return (
    <li className="show__item">
      <svg
        data-testid="user-collections-icon"
        className={`show__icon ${
          collection[`${Object.keys(collection)[0]}`].findIndex(
            (el) => el === id
          ) === -1
            ? ''
            : 'in-collection'
        }`}
        onClick={onCollectionClick}
      >
        <use
          xlinkHref={`${require('../../../styles/img/sprite.svg')}#icon-${
            collection.icon
          }`}
        ></use>
      </svg>
    </li>
  );
};

BookmarkItem.propTypes = {
  collection: PropTypes.object,
  id: PropTypes.string,
  updateCollection: PropTypes.func.isRequired,
};

export default connect(null, { updateCollection })(BookmarkItem);
