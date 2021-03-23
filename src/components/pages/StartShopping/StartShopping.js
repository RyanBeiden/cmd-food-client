/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { ProductListContext } from '../../../helpers/data/ProductListProvider';
import './StartShopping.scss';

function StartShopping(props) {
  const [aisleList, setAisleList] = useState(null);
  const [leftSide, setLeftSide] = useState(false);
  const [rightSide, setRightSide] = useState(false);
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
      .then(() => setAisleList(groupByAisle(productList)));
  }, []);

  const groupByAisle = (list) => {
    const res = [];
    const map = {};
    list.forEach((item) => {
      const temp = {};
      if (!map[item.product.aisle]) {
        map[item.product.aisle] = [];
        temp[item.product.aisle] = map[item.product.aisle];
        res.push(temp);
      }
      map[item.product.aisle].push({ product: item.product });
    });
    return res;
  };

  const selectSideEvent = (e) => {
    if (e.target.id === 'left') {
      setRightSide(false);
      setLeftSide(true);
    } else if (e.target.id === 'right') {
      setLeftSide(false);
      setRightSide(true);
    }
  };

  // IDK what's going on here below, but I gotta find a way to sort this array from Aisle 1 - Produce (i.e. Aisle 2, Aisle 4, Aisle 6, Produce, etc.)
  // WIP BELOW / Don't sort by productId, but sort by array key!

  const startShopping = (key) => console.warn(productList.sort((a, b) => {
    const x = a[key]; const y = b[key];
    console.warn(aisleList);
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  }));

  //

  return (
    <div className='start-shopping'>
      <h3>Choose a side of the store to start</h3>
      <div className='side-selectors'>
        <button id='left' onClick={selectSideEvent} className={leftSide ? 'selected' : ''}>Left</button>
        <button id='right' onClick={selectSideEvent} className={rightSide ? 'selected' : ''}>Right</button>
      </div>
      {aisleList !== null
        ? <PlayCircleOutlineIcon className='play-icon' onClick={startShopping} />
        : ''
      }
    </div>
  );
}

export default StartShopping;
