/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Product from '../../shared/Product/Product';
import { KrogerContext } from '../../../helpers/data/KrogerProvider';
import './AddProduct.scss';

function AddProduct(props) {
  const { searchProduct } = useContext(KrogerContext);
  const [param, setParam] = useState('');
  const [location, setLocation] = useState('');
  const [start, setStart] = useState(1);
  const [krogerProducts, setKrogerProducts] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const response = await fetch('https://cmd-food.herokuapp.com/profiles', {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('cf_token')}`,
      },
    });
    const value = await response.json();
    setLocation(value[0].current_store);
  };

  const handleInputChange = (e) => {
    setParam(e.target.value);
  };

  const listChange = (e) => {
    let newStart = start;
    switch (e.target.id) {
      case 'next':
        if (start <= 1000) {
          newStart += 5;
        }
        break;
      case 'prev':
        if (start >= 6) {
          newStart -= 5;
        }
        break;
      default:
        console.warn('Default');
    }
    setStart(newStart);
    return startSearch(e);
  };

  const startSearch = (e) => {
    e.preventDefault();
    setLoader(true);
    const searchData = {
      locationId: location.kroger_id,
      term: param,
      start,
    };

    searchProduct(searchData)
      .then((res) => setKrogerProducts(res.data))
      .then(() => setLoader(false));
  };

  return (
    <div className='add-product'>
      <h3>You can search by product name or keyword.</h3>
      <hr className='separator' />
      <Form>
        <Form.Group controlId="email">
          <Form.Control type="text" onChange={handleInputChange} required />
        </Form.Group>
        <div className="formSubmit">
          <button type="submit" onClick={startSearch}>Search</button>
        </div>
      </Form>
      {loader
        ? <ProgressBar className='progress-top' animated variant='secondary' now={100} />
        : ''
      }
      <div>
        {krogerProducts !== null
          ? krogerProducts.map((product) => <Product
              key={`kroger-${product.productId}`}
              krogerProduct={product}
              kroger={true}
              location={location}
            >{product.description}
            </Product>)
          : ''
        }
        {krogerProducts !== null
          ? <div className='prev-next'>
              <button id='prev' onClick={listChange}>&#60; Prev</button>
              <button id='next' onClick={listChange}>Next &#62;</button>
            </div>
          : ''
        }
        {loader
          ? <ProgressBar className='progress-bottom' animated variant='secondary' now={100} />
          : ''
        }
      </div>
    </div>
  );
}

export default AddProduct;
