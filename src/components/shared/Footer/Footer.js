import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';

import './Footer.scss';

function Footer(props) {
  return (
    <footer>
      <div className="footer-text">
        <GitHubIcon className='github'/>
        <h5>Created by <a href='https://ryanbeiden.com' target='_blank' rel="noreferrer">Ryan Beiden</a></h5>
      </div>
      <svg
        className='footer-background'
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 500">
        <path
          fill="#116466"
          fillOpacity="1"
          d="M0,300L1440,500L1440,0L0,0Z">
        </path>
      </svg>
    </footer>
  );
}

export default Footer;
