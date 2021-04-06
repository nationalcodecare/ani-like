import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
// Action
import {
  editUserComment,
  deleteUserComment,
} from '../../actions/fetchComments';
// Utils
import CommentOptions from './CommentOptions';
import Modal from '../utils/Modal';
import ModalActions from '../utils/ModalActions';
import Spinner from '../utils/Spinner';

const CommentItem = ({
  userId, //  For comment options
  titleId,
  comment, // Current Comment
  loading,
  editUserComment,
  deleteUserComment,
}) => {
  const [editStatus, setEditStatus] = useState(false); // editting comment
  const [modal, setModal] = useState(false); //  deleting comment(modal)
  const [commentText, setCommentText] = useState(comment.comment); //Textarea value for comment
  const [loadingCom, setLoadingCom] = useState(false);

  if (loading) {
    return (
      <li className="comment">
        <figure className="comment__shape sceletion">&nbsp;</figure>
        <div className="comment__info">
          <div className="comment__up-row">
            <span className="comment__nickname sceletion sceletion__line">
              &nbsp;
            </span>
          </div>
          <div className="comment__text sceletion sceletion__avg-line">&nbsp;</div>
          <span className="comment__reply">Reply</span>
        </div>
      </li>
    );
  }

  // Edit options
  const onEditClick = () => {
    setEditStatus(!editStatus);
  };
  // Edit sub-options
  const onCancelEdit = () => {
    setEditStatus(!editStatus);
  };

  const onConfirmEdit = async () => {
    setEditStatus(!editStatus);
    setLoadingCom(true);

    await editUserComment(comment._id, { comment: commentText });
    setLoadingCom(false);
  };

  // Delete options
  const onDeleteClick = () => {
    setModal(!modal);
  };

  // Modal options
  const onCancelModal = () => {
    setModal(!modal);
  };

  const onConfirmModal = async () => {
    setModal(!modal);
    setLoadingCom(true);

    await deleteUserComment(comment._id);
    setLoadingCom(false);
  };

  const renderModal = () => {
    if (modal) {
      return (
        <Modal
          message={'Delete this Comment?'}
          actions={
            <ModalActions
              onCancelModal={onCancelModal}
              onConfirmModal={onConfirmModal}
            />
          }
        />
      );
    }
    return;
  };

  const renderUserOptions = () => {
    if (userId === comment.user._id) {
      return (
        <CommentOptions
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      );
    }
    return;
  };

  const renderEdit = () => {
    if (editStatus) {
      return (
        <div className="comment__text">
          <div className="comment-input" style={{ height: '13rem' }}>
            <textarea
              id="edit-comment"
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
            ></textarea>
            <div className="edit-btns">
              <button
                onClick={onCancelEdit}
                className="user-cancel-comment comment__delete btn"
              >
                Cancel
              </button>
              <button
                onClick={onConfirmEdit}
                className="user-edit-comment comment__edit btn"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      );
    }

    // User Comments
    return (
      <Fragment>
        <div className="comment__text">{comment.comment}</div>
        <div className="comment__down-row">
          <span className="comment__reply">Reply</span>
          {renderUserOptions()}
        </div>
      </Fragment>
    );
  };

  const renderPage = () => {
    if (loadingCom) {
      return <Spinner />;
    }
    return (
      <li className={comment.className ? comment.className : 'comment'}>
        {renderModal()}
        <figure className="comment__shape">
          <img
            src={
              titleId
                ? `https://anime-like-bucket.s3.us-east-2.amazonaws.com/users/${comment.user.photo}`
                : `https://anime-like-bucket.s3.us-east-2.amazonaws.com/titles/${comment.title.image}`
            }
            alt={comment.title.name}
            className="comment__img"
            data-testid="comment-avatar"
          />
          <figcaption className="comment__caption">
            <Link
              to={`/titles/${comment.title._id}`}
              className="comment__title-link"
            >
              Watch
            </Link>
          </figcaption>
        </figure>
        <div className="comment__info">
          <div className="comment__up-row">
            <span className="comment__nickname">
              {titleId ? comment.user.name : comment.title.name}
            </span>
            <span className="comment__date">
              {new Date(comment.createdAt).toLocaleDateString('en-US')}
            </span>
          </div>
          {renderEdit()}
        </div>
      </li>
    );
  };
  return renderPage();
};

CommentItem.propTypes = {
  userId: PropTypes.string,
  titleId: PropTypes.string,
  comment: PropTypes.object.isRequired,
  editUserComment: PropTypes.func.isRequired,
  deleteUserComment: PropTypes.func.isRequired,
};

export default connect(null, {
  editUserComment,
  deleteUserComment,
})(CommentItem);
