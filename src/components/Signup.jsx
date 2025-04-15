import { useState } from 'react';
import api from '../utils/api';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Signup = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('api/signup/', { username, password });
      setMessage('Signup successful! Please log in.');
      setTimeout(() => onLogin(), 2000);
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Container className="mt-5">
      <h2>Sign Up</h2>
      {message && <Alert variant={message.includes('Error') ? 'danger' : 'success'}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">Sign Up</Button>
      </Form>
    </Container>
  );
};

export default Signup;