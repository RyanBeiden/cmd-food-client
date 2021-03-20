import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';

function Auth(props) {
  return (
    <div className='auth'>
      <Link to='/register' className='register-button'>Register</Link>
      <Link to='/login' className='login-button'>Login</Link>
    </div>
  );
}

export default Auth;
