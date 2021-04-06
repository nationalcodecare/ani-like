import React from 'react';

const Spinner = () => {
  return (
    <div data-testid="spinner" className="spinner">
      <svg>
        <use
          xlinkHref={`${require('../../styles/img/sprite.svg')}#icon-loader`}
        ></use>
      </svg>
    </div>
  );
};

export default Spinner;