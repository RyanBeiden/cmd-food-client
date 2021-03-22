import React, { useContext } from 'react';
import { ProductListContext } from '../../../helpers/data/ProductListProvider';
import './Product.scss';

function Product(props) {
  const { listItem } = props;
  const { deleteProductList, updateProductList } = useContext(ProductListContext);

  const deleteListItem = () => {
    const newListItem = { ...listItem };
    newListItem.completed = true;
    updateProductList(listItem.id, newListItem)
      .then(() => deleteProductList(listItem.id))
      .then(() => window.location.reload());
  };

  return (
    <div className='product'>
      <div className='container'>
        <img src={listItem.product.image_url} alt={listItem.product.name} />
        <p className='name'>{listItem.product.name}</p>
        <p className='price'>${listItem.product.price}</p>
        {props.basket
          ? <button onClick={deleteListItem}>Remove</button>
          : ''
        }
      </div>
    </div>
  );
}

export default Product;
