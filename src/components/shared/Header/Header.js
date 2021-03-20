import React from 'react';
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';

import './Header.scss';

function Header(props) {
  return (
    <header>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 500">
        <path
          fill="#116466"
          fillOpacity="1"
          d="M0,500L1440,300L1440,0L0,0Z">
        </path>
      </svg>
      <div className="header-text">
        <h1>Cmd + Food</h1>
        <h3>Plan your next grocery trip.</h3>
      </div>
      {localStorage.getItem('cf_token') !== null
        ? <div className='dropdown-container'>
          <DropdownButton variant="secondary" id="dropdown-button"
            title={
              <img
                className="thumbnail-image"
                src='https://res.cloudinary.com/hhrrinvop/image/upload/v1616271222/cmd-food-assets/media/profiles/placeholder-profile-image_ey6lff.jpg'
                alt="Profile"
              />
            }>
            <Link to='/profile' className='nav-link'>Profile</Link>
            <Link to='/Basket' className='nav-link'>Basket</Link>
            <Link to='/start' className='nav-link'>Start Shopping</Link>
          </DropdownButton>
        </div>
        : ''
      }
    </header>
  );
}

export default Header;
