import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// redux
import { connect } from 'react-redux';
// Actions
import { fetchTitles } from '../../actions/fetchTitles';
// utils
// import CardItem from '../home/CardItem';
import AccountCard from './AccountCard';
import Pagination from '../layout/Pagination';

const Collections = ({
  fetchTitles,
  auth,
  titles,
  collectionName,
  currentCollection,
}) => {
  // Main objects
  const allTitles = titles.titles;
  const titlesLoading = titles.loading;
  const user = auth.user;
  const loading = auth.loading;

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [titlesPerPage] = useState(18);

  // User collections
  let collections;
  if (user && !loading) {
    collections = {
      favourites: user.favourites,
      completed: user.completed,
      planned: user.planned,
      dropped: user.dropped,
      onHold: user.onHold,
      currents: user.currents,
    };
  }

  useEffect(() => {
    if (titlesLoading && user) {
      (async () => {
        await fetchTitles();
      })();
    }
  }, [fetchTitles, titlesLoading, user]);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current titles positions
  const indexOfLastTitle = currentPage * titlesPerPage;
  const indexOfFirstTitle = indexOfLastTitle - titlesPerPage;

  const getTitles = () => {
    if (allTitles.length > 0) {
      return allTitles.filter((el) =>
        collections[currentCollection].includes(el.id)
      );
    }
    return allTitles;
  };

  const renderCards = () => {
    if (user && collections[currentCollection].length === 0) {
      return (
        <div className="account__message">
          <h2 className="sign-up__heading">You don't have any titles yet</h2>
        </div>
      );
    }

    if (titlesLoading) {
      let titlefakes = [];
      for (let i = 0; i < titlesPerPage; i++) {
        titlefakes.push(i);
      }

      return titlefakes.map((el) => {
        return (
          <AccountCard key={el} title={{}} titlesLoading={titlesLoading} />
        );
      });
    }

    // Get only first 18 titles by positions
    const currentTitles = getTitles().slice(
      indexOfFirstTitle,
      indexOfLastTitle
    );

    return currentTitles.map((title) => {
      return (
        <AccountCard
          key={title.id}
          title={title}
          titlesLoading={titlesLoading}
        />
      );
    });
  };

  return (
    <Fragment>
      <h2 id="collection__header" className="sign-up__heading">
        {collectionName}
      </h2>
      <div className="account-cards">{renderCards()}</div>
      <Pagination
        thingsPerPage={titlesPerPage}
        totalCount={getTitles().length}
        paginate={paginate}
        target={'collection__header'}
      />
    </Fragment>
  );
};

Collections.propTypes = {
  titles: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  collectionName: PropTypes.string.isRequired,
  currentCollection: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    titles: state.titles,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { fetchTitles })(Collections);
