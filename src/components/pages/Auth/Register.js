import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../../../helpers/data/AuthProvider';

function Register(props) {
  const { createShopper } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [shopper, setShopper] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const newShopperState = { ...shopper };
    newShopperState[e.target.id] = e.target.value;
    setShopper(newShopperState);
  };

  const saveShopper = async (e) => {
    e.preventDefault();
    if (shopper.password === shopper.confirmPassword) {
      const newShopper = {
        first_name: shopper.firstName,
        last_name: shopper.lastName,
        email: shopper.email,
        password: shopper.password,
        profile_img: '',
      };

      await createShopper(newShopper)
        .then((response) => {
          if ('token' in response) {
            localStorage.setItem('cf_token', response.token);
          }
        })
        .then(() => props.history.push('/profile'));
    } else {
      setShow(true);
    }
  };

  return (
    <div className='register'>
      <Form>
        <Form.Group controlId="firstName">
          <Form.Label>First Name *</Form.Label>
          <Form.Control type="text" onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name *</Form.Label>
          <Form.Control type="text" onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email *</Form.Label>
          <Form.Control type="email" onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password *</Form.Label>
          <Form.Control type="password" onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password *</Form.Label>
          <Form.Control type="password" onChange={handleInputChange} required />
        </Form.Group>
        {show
          ? <Alert className='password-alert' variant="danger" onClose={() => setShow(false)} dismissible>
              <p>Passwords do not match.</p>
            </Alert>
          : ''
        }
        <div className="formSubmit">
          <Button type="submit" onClick={saveShopper}>Register</Button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
