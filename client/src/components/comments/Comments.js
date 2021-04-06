import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Action
import { fetchUserComments } from '../../actions/fetchComments';
import { fetchTitleComments } from '../../actions/fetchComments';
// Utils
import CommentItem from './CommentItem';
import Pagination from '../layout/Pagination';

const Comments = ({
  auth,
  titleId, // Passed from SpecificPage Component
  fetchUserComments,
  fetchTitleComments,
  comments,
  currentComment,
}) => {
  // Main objects
  const user = auth.user;
  const allComments = comments.comments;
  // const loading = comments.loading;

  const [loading, setLoading] = useState(comments.loading);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentPerPage] = useState(10);
  const [, updateState] = useState(0);

  useEffect(() => {
    if (titleId) {
      (async () => {
        setLoading(true);
        await fetchTitleComments(titleId);
        setLoading(false);
      })();
    } else if (!titleId && user) {
      (async () => {
        setLoading(true);
        await fetchUserComments(user._id);
        setLoading(false);
      })();
    }
  }, [titleId, fetchTitleComments, fetchUserComments, user]);

  useEffect(() => {
    //   Create/Update/Delete comment
    if (Object.keys(currentComment).length !== 0) {
      if (currentComment.isCreated) {
        allComments.unshift(currentComment);
        updateState(Math.random());
      } else if (!currentComment.isDeleted && !currentComment.isCreated) {
        allComments.splice(
          allComments.findIndex((el) => el._id === currentComment._id),
          1,
          currentComment
        );
        updateState(Math.random());
      } else if (currentComment.isDeleted) {
        allComments.splice(
          allComments.findIndex((el) => el._id === currentComment._id),
          1
        );
        updateState(Math.random());
      }
    }
  }, [allComments, currentComment, updateState]);

  // Pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Get current titles positions
  const indexOfLastComment = currentPage * commentPerPage;
  const indexOfFirstComment = indexOfLastComment - commentPerPage;

  const renderComments = () => {
    if (loading) {
      return [1, 2, 3, 4, 5].map((el) => (
        <CommentItem
          key={el}
          comment={{}}
          userId={user ? user._id : null}
          titleId={titleId}
          loading={loading}
        />
      ));
    }
    if (allComments.length === 0) {
      return (
        <div className="account__message">
          <h2 className="sign-up__heading">No comments yet</h2>
        </div>
      );
    }

    // Render specific number of comments
    const currentComments = allComments.slice(
      indexOfFirstComment,
      indexOfLastComment
    );

    return currentComments.map((comment) => (
      <CommentItem
        key={comment._id}
        comment={comment}
        userId={user ? user._id : null}
        titleId={titleId}
        loading={loading}
      />
    ));
  };

  return (
    <Fragment>
      <h2
        id="collection__header"
        className="sign-up__heading margint-top-big account__header"
      >
        Comments
      </h2>
      <ul
        data-testid="comments-list"
        className={`comments ${user && !titleId ? 'account__comments' : ''}`}
      >
        {renderComments()}
      </ul>
      <Pagination
        thingsPerPage={commentPerPage}
        totalCount={allComments.length}
        paginate={paginate}
        target={'collection__header'}
      />
    </Fragment>
  );
};

Comment.propTypes = {
  auth: PropTypes.object.isRequired,
  titleId: PropTypes.string,
  fetchUserComments: PropTypes.func.isRequired,
  fetchTitleComments: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  currentComment: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    comments: state.comments,
    currentComment: state.currentComment,
  };
};

export default connect(mapStateToProps, {
  fetchUserComments,
  fetchTitleComments,
})(Comments);
