import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Actions
import { createComment } from '../../actions/fetchComments';
// Utils
import Spinner from '../utils/Spinner';

const CreateComment = ({ titleId, createComment }) => {
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createComment(titleId, commentText);
    setLoading(false);
    setCommentText('');
  };

  const renderPage = () => {
    if (loading) {
      return <Spinner />;
    }

    return (
      <form onSubmit={onSubmit} className="comment-input">
        <textarea
          onChange={(e) => setCommentText(e.target.value)}
          id="leave-comment"
          placeholder="Remember, be nice!"
          value={commentText}
        ></textarea>
        <button data-testid="create-comment-btn" className="comments__read">Post</button>
      </form>
    );
  };

  return renderPage();
};

CreateComment.propTypes = {
  titleId: PropTypes.string.isRequired, 
  createComment: PropTypes.func.isRequired
};

export default connect(null, { createComment })(CreateComment);
