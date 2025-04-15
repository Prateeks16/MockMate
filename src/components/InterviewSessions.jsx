import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Container, Button, ListGroup, Form, Alert } from 'react-bootstrap';

const InterviewSessions = ({ token }) => {
  const [sessions, setSessions] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      api.get('api/interview-sessions/', {
        headers: { Authorization: `Token ${token}` },
      })
        .then((response) => setSessions(response.data))
        .catch((error) => console.error('Error fetching sessions:', error))
        .finally(() => setLoading(false));
    }
  }, [token]);

  const handleCreateSession = () => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    const formData = new FormData();
    if (resumeFile) formData.append('resume_file', resumeFile);
    api.post('api/interview-sessions/', formData, {
      headers: {
        Authorization: `Token ${token}`, // Explicitly use localStorage token
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('Success:', response.data);
        setSessions([...sessions, response.data]);
        setError(null);
      })
      .catch((error) => {
        console.error('Error creating session:', error.response?.data || error);
        setError('Failed to create session. Check token or server.');
      });
  };
  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  if (!token) return <p>Please log in to view sessions.</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <Container className="mt-5">
      <h2>Your Interview Sessions</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Upload Resume</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" onClick={handleCreateSession} className="mb-3">
          Create New Session
        </Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      <ListGroup>
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <ListGroup.Item key={session.id}>
              Session {session.id} - Created: {new Date(session.created_at).toLocaleString()}
              {session.resume_file && <p>Resume: {session.resume_file}</p>}
              <h4>Sample Questions:</h4>
              <ul>
                <li>Tell me about yourself.</li>
                <li>What are your strengths?</li>
                <li>Why do you want this job?</li>
              </ul>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No sessions yet.</ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
};

export default InterviewSessions; 