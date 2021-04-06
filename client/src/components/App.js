import React, { Fragment, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import Account from './pages/Account';
import Login from './authentication/Login';
import RestorePassword from './authentication/RestorePassword';
import Titles from './pages/Titles';
import SpecificTitle from './pages/SpecificTitle';

// Utils
import setAuthToken from '../globalUtils/setAuthToken';
import PrivateRoute from '../globalUtils/PrivateRoute';
import ScrollToTop from '../globalUtils/ScrollToTop';
import Alerts from './utils/Alerts';

// Redux store
import store from '../store';
import { loadUser } from '../actions/auth';
import { LOGOUT } from '../actions/types';
import history from '../history';
import '../styles/css/App.css';

const App = () => {

  useEffect(() => {
    if (localStorage.jwt) {
      setAuthToken(localStorage.jwt);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.jwt) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Fragment>
      <Router history={history}>
        <Alerts />
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/titles" component={Titles} />
          <Route exact path="/titles/:id" component={SpecificTitle} />
          <Route path="/login" component={Login} />
          <Route path="/restorePassword/:token" component={RestorePassword} />
          <PrivateRoute path="/me" component={Account} />
          <Route path="/:junk" component={HomePage} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
