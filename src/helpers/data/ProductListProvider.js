import React, { useState } from 'react';

export const ProductListContext = React.createContext();

function ProductListProvider(props) {
  const [productList, setProductList] = useState([]);

  const addProductList = (newProductList) => new Promise((resolve, reject) => {
    fetch('https://cmd-food.herokuapp.com/productlists', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('cf_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProductList),
    })
      .then((response) => resolve(response.json()))
      .catch((err) => reject(err));
  });

  const getProductsByUser = async (userId) => new Promise((resolve, reject) => {
    fetch(`https://cmd-food.herokuapp.com/productlists?user_id=${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('cf_token')}`,
      },
    })
      .then((response) => (response.json()))
      .then((res) => resolve(setProductList(res)))
      .catch((err) => reject(err));
  });

  const deleteProductList = (listId) => new Promise((resolve, reject) => {
    fetch(`https://cmd-food.herokuapp.com/productlists/${listId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('cf_token')}`,
      },
    })
      .then(() => resolve())
      .catch((err) => reject(err));
  });

  const updateProductList = (listId, list) => new Promise((resolve, reject) => {
    fetch(`https://cmd-food.herokuapp.com/productlists/${listId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('cf_token')}`,
      },
      body: JSON.stringify(list),
    })
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });

  return (
    <ProductListContext.Provider value={{
      getProductsByUser,
      productList,
      deleteProductList,
      updateProductList,
      addProductList,
    }}>
      { props.children }
    </ProductListContext.Provider>
  );
}

export default ProductListProvider;
