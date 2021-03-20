import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../../../helpers/data/AuthProvider';

function Login(props) {
  const { loginShopper } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [shopper, setShopper] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const newShopperState = { ...shopper };
    newShopperState[e.target.id] = e.target.value;
    setShopper(newShopperState);
  };

  const saveShopper = async (e) => {
    e.preventDefault();
    const newShopper = {
      email: shopper.email,
      password: shopper.password,
    };

    await loginShopper(newShopper)
      .then((response) => {
        if ('token' in response) {
          localStorage.setItem('cf_token', response.token);
          window.location = 'http://localhost:3000/';
        } else {
          setShow(true);
        }
      });
  };

  return (
    <div className='register-login'>
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email *</Form.Label>
          <Form.Control type="text" onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password *</Form.Label>
          <Form.Control type="password" onChange={handleInputChange} required />
        </Form.Group>
        {show
          ? <Alert className='password-alert' variant="danger" onClose={() => setShow(false)} dismissible>
              <p>Email or Password is incorrect.</p>
            </Alert>
          : ''
        }
        <div className="formSubmit">
          <Button type="submit" onClick={saveShopper}>Login</Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
