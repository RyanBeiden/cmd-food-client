/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { ProductListContext } from '../../../helpers/data/ProductListProvider';
import Product from '../../shared/Product/Product';
import './Basket.scss';

function Basket(props) {
  const [currentStore, setCurrentStore] = useState({});
  const { getProductsByUser, productList } = useContext(ProductListContext);
  const [loader, setLoader] = useState(false);

  const getProfile = async () => {
    const response = await fetch('https://cmd-food.herokuapp.com/profiles', {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('cf_token')}`,
      },
    });
    const value = await response.json();
    setCurrentStore(value[0].current_store.id);
    getProductsByUser(value[0].id)
      .then(() => setLoader(false));
  };

  useEffect(() => {
    setLoader(true);
    getProfile();
  }, []);

  return (
    <div className='basket'>
      {/* <h5>Basket Total: <span className='money'>TOTAL HERE</span></h5> */}
      <div className='button-container'>
        {currentStore !== null
          ? <>
              <Link to='/product/add'><button>Add Product</button></Link>
              {/* <Link to={`/location/${currentStore}/edit`}><button>Edit Location</button></Link> */}
            </>
          : <Link to='/location/add'><button>Add Location</button></Link>
        }
      </div>
      {loader
        ? <ProgressBar className='progress-top' animated variant='secondary' now={100} />
        : ''
      }
      {productList
        ? productList.map((singleProduct) => <Product
            key={`product-${singleProduct.product.id}`}
            listItem={singleProduct}
            basket={true}
          />)
        : <p className='no-products'>No products in your cart</p>
      }
    </div>
  );
}

export default Basket;
