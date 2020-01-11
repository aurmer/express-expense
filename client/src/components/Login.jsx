import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import '../App.css';

const Login = () => {
  return (
    <Card className="login-card-element">
      <Card.Header>Welcome!</Card.Header>
      <Card.Body>
        <Card.Title className="text-center">Sign in with:</Card.Title>
        <Button block className="btn-facebook">
          Facebook
        </Button>
        <br />
        <Button block className="btn-google">
          Google
        </Button>
        <br />
        <Button block className="btn-github">
          Github
        </Button>
        <br />
      </Card.Body>
    </Card>
  );
};

export default Login;
