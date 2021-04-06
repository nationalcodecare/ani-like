import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BookmarkItem from './BookmarkItem';

const BookmarkList = ({ user, id }) => {
  if (!user) {
    return <Fragment></Fragment>;
  }

  const collections = [
    { favourites: user.favourites, icon: 'favorite' },
    { currents: user.currents, icon: 'eye' },
    { completed: user.completed, icon: 'playlist_add_check' },
    { planned: user.planned, icon: 'playlist_add' },
    { dropped: user.dropped, icon: 'cancel_schedule_send' },
    { onHold: user.onHold, icon: 'attach_file' },
  ];

  const renderList = () => {
    return collections.map((collection) => {
      return (
        <BookmarkItem key={collection.icon} collection={collection} id={id} />
      );
    });
  };

  return <ul className="show__bookmarks">{renderList()}</ul>;
};

BookmarkList.propTypes = {
  user: PropTypes.object,
  id: PropTypes.string.isRequired,
};

export default BookmarkList;
