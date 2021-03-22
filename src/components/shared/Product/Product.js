import React, { useContext } from 'react';
import { ProductListContext } from '../../../helpers/data/ProductListProvider';
import './Product.scss';

function Product(props) {
  const { listItem, krogerProduct } = props;
  const { deleteProductList, updateProductList } = useContext(ProductListContext);

  // Re-evaluate these variables and put in a useEffect:
  // const krogerUrl = krogerProduct.images[0].sizes[1].url;
  // const krogerPrice = krogerProduct.items[0].price.regular;

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
              <img src={krogerProduct.images[0].sizes[1].url} alt='Kroger' />
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
          ? <button>Add</button>
          : ''
        }
      </div>
    </div>
  );
}

export default Product;
