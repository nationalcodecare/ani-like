import React from 'react';
import PropTypes from 'prop-types';
import TitleItem from './TitleItem';

const TitleList = ({ titles, titleLoading }) => {
  const renderList = () => {
    if (titleLoading) {
      return [1, 2, 3, 4, 5].map((el) => (
        <TitleItem key={el} title={{}} titleLoading={titleLoading} />
      ));
    }
    return titles.map((title) => (
      <TitleItem key={title._id} title={title} titleLoading={titleLoading} />
    ));
  };

    if (titles.length === 0) {
      return <h2 className="sign-up__heading account__header">OOPS... No titles found!</h2>;
    }

  return (
    <div className="container-2">
      <div id="shows" data-testid="title-shows" className="shows">
        {renderList()}
      </div>
    </div>
  );
};

TitleList.propTypes = {
  titles: PropTypes.array.isRequired,
  titleLoading: PropTypes.bool.isRequired,
};

export default TitleList;
