import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PhotoInput = ({ setPhoto, preview }) => {
  const [status, setStatus] = useState(
    `https://anime-like-bucket.s3.us-east-2.amazonaws.com/users/${preview}`
  );

  const onChange = (e) => {
    setPhoto(e.target.files[0]);

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setStatus(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="form__group">
      <img className="form__user-photo" src={status} alt="user" />
      <input
        className="form__upload"
        type="file"
        accept="image/*"
        id="photo"
        name="photo"
        onChange={onChange}
      />
      <label htmlFor="photo" className="form__btn account__btn">
        Choose new photo
      </label>
    </div>
  );
};

PhotoInput.propTypes = {
  setPhoto: PropTypes.func.isRequired,
  preview: PropTypes.string.isRequired,
};

export default PhotoInput;
