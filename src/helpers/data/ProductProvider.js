import React from 'react';

export const ProductContext = React.createContext();

function ProductProvider(props) {
  return (
    <ProductContext.Provider value={ 'ProductProvider' }>
      { props.children }
    </ProductContext.Provider>
  );
}

export default ProductProvider;
