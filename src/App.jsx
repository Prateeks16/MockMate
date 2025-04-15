import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import InterviewSessions from './components/InterviewSessions.jsx';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const handleLogin = (newToken) => {
    setToken(newToken);
    setIsAuthenticated(true);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken('');
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <AppNavbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/signup" element={<Signup onLogin={() => handleLogin('')} />} />
        <Route path="/login" element={<Login setToken={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} />
        <Route path="/sessions" element={<InterviewSessions token={token} />} />
        <Route path="/" element={<Login setToken={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;