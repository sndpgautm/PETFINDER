import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Animals from './components/animals/Animals';
import AnimalProfile from './components/animals/AnimalProfile';
import AddAnimalForm from './components/animals/AddAnimalForm';
import EditOrgInfoForm from './components/organizations/EditOrgInfoForm';

import PrivateRoute from './components/routing/PrivateRoute';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadOrganization } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // See useEffect hooks for more info, [] makes sure its run only once
  useEffect(() => {
    store.dispatch(loadOrganization());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/animals' component={Animals} />
              <Route exact path='/animal/:id' component={AnimalProfile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-animal-profile'
                component={AddAnimalForm}
              />
              <PrivateRoute
                exact
                path='/edit-org-info'
                component={EditOrgInfoForm}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
