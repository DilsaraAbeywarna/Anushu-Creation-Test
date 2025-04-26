import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/Images/header_img.png';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = formData;

    const mockCredentials = {
      username: 'user123',
      password: 'password123',
    };

    if (username === mockCredentials.username && password === mockCredentials.password) {
      setError('');
      navigate('/patients');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh', 
        }}
      >
        <Paper elevation={10} sx={{ display: 'flex', width: '800px', overflow: 'hidden' }}>
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}
          >
            <img 
              src={loginImage} 
              alt="Login Illustration" 
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
            />
          </Box>
          <Box 
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                autoFocus
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />

              {error && (
                <Typography color="error" variant="body2" mt={2}>
                  {error}
                </Typography>
              )}
              
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
  