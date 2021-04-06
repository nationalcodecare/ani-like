import React from 'react';
import PropTypes from 'prop-types';

const CommentOptions = ({ onEditClick, onDeleteClick }) => {
  return (
    <div className="comment__options">
      <button  data-testid="option-comment-btn" onClick={onEditClick} className="comment__edit btn">
        Edit
      </button>
      <button  data-testid="option-comment-btn" onClick={onDeleteClick} className="comment__delete btn">
        Delete
      </button>
    </div>
  );
};

CommentOptions.propTypes = {
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CommentOptions;
