import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AppNavbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">MockMate</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isAuthenticated ? (
              <>
                <Nav.Link onClick={() => navigate('/signup')}>Sign Up</Nav.Link>
                <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;