import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
// Actions
import { fetchTop10 } from '../../actions/fetchTitles';   // async api call with data response
// Utils
import CardItem from './CardItem';

const CardList = ({ fetchTop10, top10 }) => {
  useEffect(() => {
    (async () => {
      await fetchTop10();
    })();
  }, [fetchTop10]);

  const renderCards = () => {
    if (top10.length === 0) {   // This is for sceletion insted of spinner
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => {
        return <CardItem key={el} />;
      });
    }

    return top10.map((title) => {   // Actual data from action API call
      return <CardItem key={title.id} title={title} />;
    });
  };

  return (
    <Fragment>
      <section id="section-top" className="section-top">
        <h3 className="section-top__heading">Week Bestlers</h3>
        <div className="top-cards">{renderCards()}</div>
        <Link to="/titles" className="section-top__btn btn-link">
          view more &rarr;
        </Link>
      </section>
    </Fragment>
  );
};

CardList.propTypes = {
  fetchTop10: PropTypes.func.isRequired,
  top10: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return { top10: state.top10 };
};

export default connect(mapStateToProps, { fetchTop10 })(CardList);
