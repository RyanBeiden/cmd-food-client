import React from 'react';

export const AuthContext = React.createContext();

function AuthProvider(props) {
  const createShopper = (shopperObj) => new Promise((resolve, reject) => {
    fetch('https://cmd-food.herokuapp.com/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shopperObj),
    })
      .then((response) => resolve(response.json()))
      .catch((err) => reject(err));
  });

  const loginShopper = (shopperObj) => new Promise((resolve, reject) => {
    fetch('https://cmd-food.herokuapp.com/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shopperObj),
    })
      .then((response) => resolve(response.json()))
      .catch((err) => reject(err));
  });

  return (
    <AuthContext.Provider value={{ createShopper, loginShopper }}>
      { props.children }
    </AuthContext.Provider>
  );
}

export default AuthProvider;
