/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
// import PersonIcon from '@material-ui/icons/Person';
import { ProductListContext } from '../../../helpers/data/ProductListProvider';
import './Home.scss';

function Home(props) {
  const [profileId, setProfileId] = useState(0);
  const [loader, setLoader] = useState(false);
  const { getProductsByUser } = useContext(ProductListContext);

  const getProfile = () => new Promise((resolve, reject) => {
    setLoader(true);
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
      .then((res) => {
        setProfileId(res[0].id);
        getProductsByUser(res[0].id);
      })
      .then(() => setLoader(false));
  }, []);

  return (
    <div className='home'>
      {loader
        ? <ProgressBar className='progress-top' animated variant='secondary' now={100} />
        : ''
      }
      {profileId !== 0
        ? <>
            <div className='button-container'>
              <Link to={`/basket/${profileId}`}>
                <button className='nav-link'><ShoppingBasketIcon className='nav-basket' />Basket</button>
              </Link>
            </div>
            <div className='button-container'>
              <Link to='/start'>
                <button className='nav-link'><PlayCircleOutlineIcon className='nav-start' />Start Shopping</button>
              </Link>
            </div>
            {/* <div className='button-container'>
              <Link to={`/profile/${profileId}`}>
                <button className='nav-link'><PersonIcon className='nav-profile' />Profile</button>
              </Link>
            </div> */}
          </>
        : ''
    }
    </div>
  );
}

export default Home;
