import { useState } from 'react';
import api from '../utils/api';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('api/login/', { username, password });
      localStorage.setItem('token', token);
      setToken(response.data.token);
      setMessage('Login successful!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
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
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;