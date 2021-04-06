import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Actions
import setAlert from '../../actions/alert';
// Components
import Navigation from '../layout/Navigation';
import Preview from '../home/Preview';
import Poster from '../home/Poster';
import Magazine from '../home/Magazine';
import CardList from '../home/CardList';
import SignUp from '../authentication/SignUp';
import Footer from '../layout/Footer';

const HomePage = ({
  isAuthorized,
  loading,
  user,
  setAlert,
  globalMessages,
}) => {
  useEffect(() => {
    if (globalMessages.status) {
      setAlert(globalMessages.message, globalMessages.status);
    }
  }, [setAlert, globalMessages]);

  const renderForm = () => {
    if (isAuthorized) {
      return;
    }
    return <SignUp />;
  };

  return (
    <Fragment>
      <Navigation />
      <div className="container">
        <Preview isAuthorized={isAuthorized} loading={loading} user={user} />
        <Poster />
        <Magazine />
        <CardList />
        {renderForm()}
        <Footer />
      </div>
    </Fragment>
  );
};

HomePage.propTypes = {
  isAuthorized: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.object,
  setAlert: PropTypes.func.isRequired,
  globalMessages: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthorized: state.auth.isAuthorized,
    loading: state.auth.loading,
    user: state.auth.user,
    globalMessages: state.globalMessages,
  };
};

export default connect(mapStateToProps, { setAlert })(HomePage);
