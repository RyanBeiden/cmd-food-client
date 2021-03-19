import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Header from '../components/pages/Header/Header';
import AuthProvider from '../helpers/data/AuthProvider';
import Login from '../components/pages/Auth/Login';
import Register from '../components/pages/Auth/Register';
import Home from '../components/pages/Home/Home';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route render={() => {
            if (localStorage.getItem('cf_token')) {
              return (
                <React.Fragment>
                  <Route exact path="/" render={(props) => <Home {...props} />} />
                </React.Fragment>
              );
            }
            return (
              <React.Fragment>
                <Redirect to="/authentication" />
                <Route exact path="/authentication" render={(props) => <Home {...props} />} />
              </React.Fragment>
            );
          }} />
          <AuthProvider>
            <Route exact path="/login" render={(props) => <Login {...props} />} />
            <Route exact path="/register" render={(props) => <Register {...props} />} />
          </AuthProvider>
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
