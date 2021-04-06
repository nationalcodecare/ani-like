import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Components
import Navigation from '../layout/Navigation';
import NavbarTop from '../layout/NavbarTop';
import AnimeTitle from '../titles/specificTitle/AnimeTitle';
import Player from '../titles/specificTitle/Player';
import CreateComment from '../comments/CreateComment';
import Comments from '../comments/Comments';
import Footer from '../layout/Footer';
import TitleList from '../titles/TitleList';
import Pagination from '../layout/Pagination';
// Actions
import { fetchSpecificTitle } from '../../actions/fetchTitles';
import setAlert from '../../actions/alert';


let prevId = window.location.href.split('/').pop();

const SpecificTitle = ({
  user,
  currentTitle,
  currentComment,
  fetchSpecificTitle,
  setAlert,
  authMessages,
  globalMessages,
  titles,
  titleLoading,
  allTitles
}) => {
  const id = window.location.href.split('/').pop();
  const [update, setUpdate] = useState(true);
  // For search
  const [currentPage, setCurrentPage] = useState(1);
  const [titlesPerPage] = useState(5);
  const [searched, setSearched] = useState(false);
  const [renderTest, setRenderTest] = useState(currentTitle);


  // Get current titles
  const indexOfLastTitle = currentPage * titlesPerPage;
  const indexOfFirstTitle = indexOfLastTitle - titlesPerPage;
  const currentTitles =
    titles.length > 0 ? titles.slice(indexOfFirstTitle, indexOfLastTitle) : [];

  if (prevId !== id) {
    setSearched(false);
    prevId = id;
  }

  useEffect(() => {
    if ((authMessages.status && update) || globalMessages.status) {
      setAlert(
        authMessages.message || globalMessages.message,
        authMessages.status || globalMessages.status
      );
      authMessages.status = null;
      globalMessages.status = null;
    }
    return () => setUpdate(!update);
  }, [setAlert, authMessages, globalMessages, update, setUpdate]);

  useEffect(() => {
    if (allTitles.loading) {
      (async () => {
        await fetchSpecificTitle(id);
      })();
    } else {
      setRenderTest(allTitles.titles.find(el => el.id === id));
    }
  }, [fetchSpecificTitle, id, allTitles]);

  useEffect(() => {
    if (allTitles.loading) {
      setRenderTest(currentTitle);
    }
  }, [allTitles, currentTitle]);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Renders title + Player
  const renderTitle = () => {
    if (currentComment.isCreated && user) {
      // For newly created Comment
      currentComment.user = {
        name: user.name,
        photo: user.photo,
        _id: user._id,
      };
      currentComment.title = {
        name: currentTitle.name,
        image: currentTitle.image,
        _id: currentTitle._id,
      };
    }

    return (
      <Fragment>
        <AnimeTitle user={user} currentTitle={renderTest} />
        <Player />
      </Fragment>
    );
  };

  const renderInput = () => {
    if (user) {
      return <CreateComment titleId={id} />;
    }
    return;
  };

  // Renders page
  const renderPage = () => {
    return (
      <Fragment>
        <Navigation />
        <NavbarTop setSearched={setSearched} />
        {!searched ? (
          <Fragment>
            {renderTitle()}
            <div className="under-show">
              {renderInput()}
              <Comments titleId={id} />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <TitleList titles={currentTitles} titleLoading={titleLoading} />
            <Pagination
              thingsPerPage={titlesPerPage}
              totalCount={titles.length}
              paginate={paginate}
              target={'shows'}
            />
          </Fragment>
        )}
        <Footer />
      </Fragment>
    );
  };

  return renderPage();
};

SpecificTitle.propTypes = {
  user: PropTypes.object,
  currentTitle: PropTypes.object.isRequired,
  currentComment: PropTypes.object,
  fetchSpecificTitle: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  authMessages: PropTypes.object.isRequired,
  globalMessages: PropTypes.object.isRequired,
  titles: PropTypes.array,
  titleLoading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    titles: state.searchTitles.titles,
    allTitles: state.titles,
    titleLoading: state.searchTitles.loading,
    currentTitle: state.currentTitle,
    currentComment: state.currentComment,
    authMessages: { message: state.auth.message, status: state.auth.status },
    globalMessages: state.globalMessages,
  };
};

export default connect(mapStateToProps, { fetchSpecificTitle, setAlert })(
  SpecificTitle
);
