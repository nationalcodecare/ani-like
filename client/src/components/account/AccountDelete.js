import React, { useState } from 'react';
import { connect } from 'react-redux';
// Actions
import { deleteAccount } from '../../actions/auth';
// Components
import ModalActions from '../utils/ModalActions';
import Modal from '../utils/Modal';
import Spinner from '../utils/Spinner';

const AccountDelete = ({ deleteAccount }) => {
  const [modal, setModal] = useState(false);
  const [deleted, setDeleted] = useState(false);

  // Modal options
  const onCancelModal = () => {
    setModal(false);
  };

  const onConfirmModal = async () => {
    setModal(false);
    setDeleted(true);
    await deleteAccount();
  };

  const renderModal = () => {
    if (modal) {
      return (
        <Modal
          message={'Are you sure to delete your account?'}
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

  const renderComponent = () => {
    if (deleted) return <Spinner />;
    return (
      <>
        {renderModal()}
        <div className="account__delete">
          <h3 className="account__delete-heading">Danger zone!</h3>
          <button
            onClick={() => setModal(true)}
            className="account__delete-btn"
          >
            Delete Account
          </button>
        </div>
      </>
    );
  };

  return renderComponent();
};

export default connect(null, { deleteAccount })(AccountDelete);
