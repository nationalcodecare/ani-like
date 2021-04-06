import React from 'react';
import PropTypes from 'prop-types';

const ModalActions = ({ onCancelModal, onConfirmModal }) => {
  return (
    <div className="edit-btns">
      <button onClick={onCancelModal} className="user-cancel-delete btn">
        Cancel
      </button>
      <button onClick={onConfirmModal} className="user-confirm-delete btn">
        Delete
      </button>
    </div>
  );
};

ModalActions.propTypes = {
  onCancelModal: PropTypes.func.isRequired,
  onConfirmModal: PropTypes.func.isRequired,
};

export default ModalActions;
