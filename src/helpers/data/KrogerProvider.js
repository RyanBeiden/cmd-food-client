import React from 'react';

export const KrogerContext = React.createContext();

function KrogerProvider(props) {
  const key = 'commandfood-2643fc5cc4b74acfaec0b769a363c3c59144191865956225003';
  const secret = 'rfOqJIx8wV43XcJQZBKKwIk9Ue5PSlbpNcMhIlGi';

  const getToken = () => {
    fetch('https://api.kroger.com/v1/connect/oauth2/token', {
      method: 'POST',
      body: `grant_type=client_credentials&client_id=${key}&client_secret=${secret}&scope=product.compact`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((resp) => resp.json())
      .then((data) => localStorage.setItem('kroger_token', data.access_token))
      .catch((err) => console.error('Something went wrong', err));
  };

  const searchProduct = (locationId, term) => new Promise((resolve, reject) => {
    getToken();
    fetch(`https://api.kroger.com/v1/products?filter.term=${term}&filter.locationId=${locationId}&filter.limit=5`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('kroger_token')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((resp) => resp.json())
      .then((data) => resolve((data)))
      .catch((err) => console.error('Something went wrong', err));
  });

  return (
    <KrogerContext.Provider value={{ getToken, searchProduct }}>
      { props.children }
    </KrogerContext.Provider>
  );
}

export default KrogerProvider;
