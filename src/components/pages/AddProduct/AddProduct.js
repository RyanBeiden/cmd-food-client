/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Product from '../../shared/Product/Product';
import { KrogerContext } from '../../../helpers/data/KrogerProvider';

function AddProduct(props) {
  const { searchProduct } = useContext(KrogerContext);
  const [param, setParam] = useState('');
  const [krogerProducts, setKrogerProducts] = useState(null);

  const handleInputChange = (e) => {
    setParam(e.target.value);
  };

  const startSearch = (e) => {
    e.preventDefault();
    searchProduct('02600576', param)
      .then((res) => setKrogerProducts(res.data));
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="email">
          <Form.Control type="text" onChange={handleInputChange} required />
        </Form.Group>
        <div className="formSubmit">
          <button type="submit" onClick={startSearch}>Search</button>
        </div>
      </Form>
      <div>
        {krogerProducts !== null
          ? krogerProducts.map((product) => <Product
              key={`kroger-${product.productId}`}
              krogerProduct={product}
              kroger={true}
            >{product.description}
            </Product>)
          : ''
        }
      </div>
    </div>
  );
}

export default AddProduct;
