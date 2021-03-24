/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Product from '../../shared/Product/Product';

function Aisles(props) {
  const { aisleList } = props;

  return (
    <div className='aisles'>
      {aisleList !== null
        ? <h3>{aisleList.description}</h3>
        : ''
      }
      {aisleList !== null
        ? aisleList.products.map((product) => <Product
          key={`aisleProduct-${product.id}`}
          aisle={true}
          aisleProduct={product}
          />)
        : ''
      }
    </div>
  );
}

export default Aisles;
