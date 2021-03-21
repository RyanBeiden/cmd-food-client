import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductListContext } from '../../../helpers/data/ProductListProvider';
import './Basket.scss';

function Basket(props) {
  const [currentStore, setCurrentStore] = useState({});
  const { getProductsByUser, productList } = useContext(ProductListContext);

  const getProfile = async () => {
    const response = await fetch('https://cmd-food.herokuapp.com/profiles', {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('cf_token')}`,
      },
    });
    const value = await response.json();
    setCurrentStore(value[0].current_store);
    getProductsByUser(value[0].id);
  };

  useEffect(() => {
    getProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='basket'>
      <h5>Basket Total: <span className='money'>$10</span></h5>
      <div className='button-container'>
        {currentStore !== null
          ? <>
              <Link to='/product/add'><button>Add Product</button></Link>
              <Link to={`/location/${currentStore}/edit`}><button>Edit Location</button></Link>
            </>
          : <Link to='/location/add'><button>Add Location</button></Link>
        }
      </div>
      {productList
        ? productList.map((singleProduct) => <p key={`product-${singleProduct.id}`}>{singleProduct.product.name}</p>)
        : ''
      }
    </div>
  );
}

export default Basket;
