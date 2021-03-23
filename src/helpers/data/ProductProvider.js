import React from 'react';

export const ProductContext = React.createContext();

function ProductProvider(props) {
  const addProduct = (product) => new Promise((resolve, reject) => {
    fetch('https://cmd-food.herokuapp.com/products', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('cf_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => resolve(response.json()))
      .catch((err) => reject(err));
  });

  return (
    <ProductContext.Provider value={{ addProduct }}>
      { props.children }
    </ProductContext.Provider>
  );
}

export default ProductProvider;
