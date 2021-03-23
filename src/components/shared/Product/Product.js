/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { ProductListContext } from '../../../helpers/data/ProductListProvider';
import { ProductContext } from '../../../helpers/data/ProductProvider';
import './Product.scss';

function Product(props) {
  const {
    listItem,
    krogerProduct,
    location,
  } = props;
  const [krogerImage, setKrogerImage] = useState('');
  const [addedToList, setAddedToList] = useState(false);
  const { deleteProductList, updateProductList, addProductList } = useContext(ProductListContext);
  const { addProduct } = useContext(ProductContext);

  useEffect(() => {
    if (props.kroger) {
      krogerProduct.images.forEach((image) => {
        if (image.perspective === 'front') {
          image.sizes.forEach((singleSize) => {
            if (singleSize.size === 'small') {
              setKrogerImage(singleSize.url);
            }
          });
        }
      });
    }
  }, []);

  const deleteListItem = () => {
    const newListItem = { ...listItem };
    newListItem.completed = true;
    updateProductList(listItem.id, newListItem)
      .then(() => deleteProductList(listItem.id))
      .then(() => window.location.reload());
  };

  const createProduct = (e) => {
    e.preventDefault();
    const newListItem = {
      kroger_id: krogerProduct.productId,
      name: krogerProduct.description,
      price: krogerProduct.items[0].price.regular,
      image_url: krogerImage,
      aisle: krogerProduct.aisleLocations[0].description,
    };

    addProduct(newListItem)
      .then((response) => {
        const productListObj = {
          product: response.id,
          location: location.id,
          completed: false,
        };
        addProductList(productListObj)
          .then(() => setAddedToList(true));
      });
  };

  return (
    <div className='product'>
      <div className='container'>
        {props.basket
          ? <>
              <img src={listItem.product.image_url} alt={listItem.product.name} />
                <p className='name'>{listItem.product.name}</p>
                <p className='price'>${listItem.product.price}</p>
            </>
          : ''
        }
        {props.kroger
          ? <>
              <img src={krogerImage} alt='Kroger' />
                <p className='name'>{krogerProduct.description}</p>
                <p className='price'>${krogerProduct.items[0].price.regular}</p>
            </>
          : ''
        }
        {props.basket
          ? <button onClick={deleteListItem}>Remove</button>
          : ''
        }
        {props.kroger
          ? <button
              onClick={addedToList ? ((e) => e.preventDefault()) : createProduct}
              className={addedToList ? 'no-click' : ''}>
                {addedToList ? 'Added' : 'Add'}
            </button>
          : ''
        }
      </div>
    </div>
  );
}

export default Product;
