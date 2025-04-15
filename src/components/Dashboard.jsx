import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Dashboard = ({ token }) => {
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container className="mt-5">
      <h2>Dashboard</h2>
      <p>Welcome! Your token is: {token}</p>
      <Button variant="primary" onClick={() => navigate('/sessions')} className="mt-3">
        View Interview Sessions
      </Button>
      <Button variant="danger" onClick={handleLogout} className="mt-3 ms-2">
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;