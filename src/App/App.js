import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Header from '../components/shared/Header/Header';
import AuthProvider from '../helpers/data/AuthProvider';
import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import EditProfile from '../components/pages/EditProfile/EditProfile';
import Profile from '../components/pages/Profile/Profile';
import Basket from '../components/pages/Basket/Basket';
import Location from '../components/pages/Location/Location';
import AddProduct from '../components/pages/AddProduct/AddProduct';
import StartShopping from '../components/pages/StartShopping/StartShopping';
import Aisles from '../components/pages/Aisles/Aisles';
import LocationProvider from '../helpers/data/LocationProvider';
import ProductProvider from '../helpers/data/ProductProvider';
import ProfileProvider from '../helpers/data/ProfileProvider';
import KrogerProvider from '../helpers/data/KrogerProvider';
import Footer from '../components/shared/Footer/Footer';

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
                  <ProductProvider>
                    <LocationProvider>
                      <ProfileProvider>
                        <Route exact path="/profile/:userId(\d+)" render={(props) => <Profile {...props} />} />
                        <Route exact path="/profile/:userId(\d+)/edit" render={(props) => <EditProfile {...props} />} />
                      </ProfileProvider>
                      <KrogerProvider>
                        <Route exact path="/location/:locationId(\d+)" render={(props) => <Location {...props} />} />
                        <Route exact path="/product/add" render={(props) => <AddProduct {...props} />} />
                      </KrogerProvider>
                      <Route exact path="/basket/:userId(\d+)" render={(props) => <Basket {...props} />} />
                      <Route exact path="/start" render={(props) => <StartShopping {...props} />} />
                      <Route exact path="/aisles/:aisleNum(\d+)" render={(props) => <Aisles {...props} />} />
                    </LocationProvider>
                  </ProductProvider>
                </React.Fragment>
              );
            }
            return (
              <React.Fragment>
                <AuthProvider>
                  <Redirect to="/authentication" />
                  <Route exact path="/authentication" render={(props) => <Auth {...props} />} />
                </AuthProvider>
              </React.Fragment>
            );
          }} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
