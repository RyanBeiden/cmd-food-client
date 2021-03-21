import React, { useState } from 'react';

export const ProductListContext = React.createContext();

function ProductListProvider(props) {
  const [productList, setProductList] = useState([]);

  const getProductsByUser = async (userId) => {
    const response = await fetch(`https://cmd-food.herokuapp.com/productlists?user_id=${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('cf_token')}`,
      },
    });
    const value = await response.json();
    return setProductList(value);
  };

  return (
    <ProductListContext.Provider value={{ getProductsByUser, productList }}>
      { props.children }
    </ProductListContext.Provider>
  );
}

export default ProductListProvider;
