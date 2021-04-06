import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const Modal = ({ message, actions }) => {
  return ReactDOM.createPortal(
    <div className="backdrop">
      <div className="backdrop__container">
        <h3 className="backdrop__msg">{message}</h3>
        {actions}
      </div>
    </div>,
    document.getElementById('modalWindow')
  );
};

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  actions: PropTypes.element.isRequired
}

export default Modal;
