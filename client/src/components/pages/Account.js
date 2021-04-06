import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
// Actions
import setAlert from '../../actions/alert';
// Utils/Components
import PrivateRoute from '../../globalUtils/PrivateRoute';
import Navigation from '../layout/Navigation';
import Footer from '../layout/Footer';
import SideBar from '../layout/SideBar';
import AccountDetails from '../account/AccountDetails';
// Collections
import Collections from '../account/Collections';
import Comments from '../comments/Comments';

const Account = ({ globalMessages, authMessages, setAlert }) => {
  const [clear, setClear] = React.useState(true);

  useEffect(() => {
    if ((authMessages.message || globalMessages.message) && clear) {
      setAlert(
        authMessages.message || globalMessages.message,
        authMessages.status || globalMessages.status
      );
    }

    return () => setClear(!clear);
  }, [setClear, authMessages, clear, setAlert, globalMessages]);

  return (
    <Fragment>
      <Navigation />
      <div className="container-2 margin-big">
        <div className="wrapper-container full-min-height">
          <SideBar />
          <div className="account">
            <Switch>
              <PrivateRoute exact path="/me" component={AccountDetails} />
              <PrivateRoute
                path="/me/favourites"
                component={() => (
                  <Collections
                    collectionName="Favourites"
                    currentCollection="favourites"
                  />
                )}
              />
              <PrivateRoute
                path="/me/currentlyWatching"
                component={() => (
                  <Collections
                    collectionName="Currently Watching"
                    currentCollection="currents"
                  />
                )}
              />
              <PrivateRoute
                path="/me/completed"
                component={() => (
                  <Collections
                    collectionName="Completed"
                    currentCollection="completed"
                  />
                )}
              />
              <PrivateRoute
                path="/me/planned"
                component={() => (
                  <Collections
                    collectionName="Planned"
                    currentCollection="planned"
                  />
                )}
              />
              <PrivateRoute
                path="/me/onHold"
                component={() => (
                  <Collections
                    collectionName="On Hold"
                    currentCollection="onHold"
                  />
                )}
              />
              <PrivateRoute
                path="/me/dropped"
                component={() => (
                  <Collections
                    collectionName="Dropped"
                    currentCollection="dropped"
                  />
                )}
              />
              <PrivateRoute path="/me/comments" component={Comments} />
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

Account.propTypes = {
  setAlert: PropTypes.func.isRequired,
  authMessages: PropTypes.object.isRequired,
  globalMessages: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    globalMessages: state.globalMessages,
    authMessages: { message: state.auth.message, status: state.auth.status },
  };
};

export default connect(mapStateToProps, { setAlert })(Account);
