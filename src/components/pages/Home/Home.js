import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PersonIcon from '@material-ui/icons/Person';
import './Home.scss';

function Home(props) {
  const [profileId, setProfileId] = useState(0);

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
      .then((res) => setProfileId(res[0].id));
  }, []);

  return (
    <div className='home'>
      {profileId !== 0
        ? <>
            <div className='button-container'>
              <Link to={`/basket/${profileId}`}>
                <button className='nav-link'><ShoppingBasketIcon className='nav-basket' />Basket</button>
              </Link>
            </div>
            <div className='button-container'>
              <Link to='/start'>
                <button className='nav-link'><PlayArrowIcon className='nav-start' />Start Shopping</button>
              </Link>
            </div>
            <div className='button-container'>
              <Link to={`/profile/${profileId}`}>
                <button className='nav-link'><PersonIcon className='nav-profile' />Profile</button>
              </Link>
            </div>
          </>
        : ''
    }
    </div>
  );
}

export default Home;
