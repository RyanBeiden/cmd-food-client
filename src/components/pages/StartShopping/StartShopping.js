/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import Aisles from '../Aisles/Aisles';
import { ProductListContext } from '../../../helpers/data/ProductListProvider';
import './StartShopping.scss';

function StartShopping(props) {
  const [aisleList, setAisleList] = useState(null);
  const [aisleIndex, setAisleIndex] = useState(0);
  const { getProductsByUser, productList } = useContext(ProductListContext);

  const getProfile = () => new Promise((resolve, reject) => {
    fetch('https://cmd-food.herokuapp.com/profiles', {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('cf_token')}`,
      },
    })
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });

  useEffect(() => {
    getProfile()
      .then((res) => getProductsByUser(res[0].id))
      .then(() => groupByAisle());
  }, [aisleIndex]);

  const groupByAisle = async () => {
    if (productList.length >= 1) {
      const aisles = [];
      const obj = {};
      await productList.forEach((item) => {
        const temp = {};
        if (!obj[item.product.aisle]) {
          obj[item.product.aisle] = [];
          temp.products = obj[item.product.aisle];
          temp.description = item.product.aisle;
          aisles.push(temp);
        }
        obj[item.product.aisle].push(item.product);
      });

      aisles.sort((a, b) => ((a.description > b.description) ? 1 : -1));
      return setAisleList(aisles);
    }
    return setAisleList.null;
  };

  return (
    <div className='start-shopping'>
      <p>Tap product when collected</p>
      {aisleList !== null
        ? <Aisles aisleList={aisleList[aisleIndex]}/>
        : ''
      }
      <button onClick={() => setAisleIndex(aisleIndex + 1)}>Next</button>
    </div>
  );
}

export default StartShopping;
