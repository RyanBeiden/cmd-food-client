import React from 'react';

export const ProductListContext = React.createContext();

function ProductListProvider(props) {
  return (
    <ProductListContext.Provider value={ 'ProductListProvider' }>
      { props.children }
    </ProductListContext.Provider>
  );
}

export default ProductListProvider;
