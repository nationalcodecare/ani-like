import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Actions
import { fetchTitles } from '../../actions/fetchTitles';
import setAlert from '../../actions/alert';
// Components
import Navigation from '../layout/Navigation';
import NavbarTop from '../layout/NavbarTop';
import Jumbotron from '../titles/Jumbotron';
import Genres from '../titles/Genres';
import TitleList from '../titles/TitleList';
import Pagination from '../layout/Pagination';
import Footer from '../layout/Footer';

const Titles = ({
  fetchTitles,
  titles,
  globalMessages,
  setAlert,
  titleLoading,
  searchTitles,
  searchLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [titlesPerPage] = useState(5);
  // For search
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    (async () => {
      await fetchTitles();
    })();
  }, [fetchTitles]);

  useEffect(() => {
    if (globalMessages.status) {
      setAlert(globalMessages.message, globalMessages.status);
    }
  }, [globalMessages, setAlert]);

  // Get current titles
  const indexOfLastTitle = currentPage * titlesPerPage;
  const indexOfFirstTitle = indexOfLastTitle - titlesPerPage;
  // For search functionality
  let currentTitles, totalCount, loading;
  if (searched) {
    currentTitles = searchTitles.slice(indexOfFirstTitle, indexOfLastTitle);
    totalCount = searchTitles.length;
    loading = searchLoading;
  } else {
    // Default loading titles
    currentTitles = titles.slice(indexOfFirstTitle, indexOfLastTitle);
    totalCount = titles.length;
    loading = titleLoading;
  }

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      <Navigation />
      <NavbarTop setSearched={setSearched} />
      <Fragment>
        {!searched ? (
          <Fragment>
            <Jumbotron titles={titles} titleLoading={titleLoading} />
            <Genres />
          </Fragment>
        ) : null}
        <TitleList titles={currentTitles} titleLoading={loading} />
        <Pagination
          thingsPerPage={titlesPerPage}
          totalCount={totalCount}
          paginate={paginate}
          target={'shows'}
          titleLoading={loading}
        />
      </Fragment>
      <Footer />
    </Fragment>
  );
};

Titles.propTypes = {
  fetchTitles: PropTypes.func.isRequired,
  titles: PropTypes.array.isRequired,
  globalMessages: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  titleLoading: PropTypes.bool,
  searchLoading: PropTypes.bool,
  searchTitles: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    titles: state.titles.titles,
    titleLoading: state.titles.loading,
    searchTitles: state.searchTitles.titles,
    searchLoading: state.searchTitles.loading,
    globalMessages: state.globalMessages,
  };
};

export default connect(mapStateToProps, { fetchTitles, setAlert })(Titles);
