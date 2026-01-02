import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { useAppDispatch } from '../store/store';
import { loginUser } from '../store/slices/authSlice';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      // Successfully logged in, redirect to home
      navigate('/');
    } catch (err: any) {
      setError(err || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              mb: 3,
            }}
          >
            
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#fff' }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.8)' }}>
            Sign in to your account
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2, backgroundColor: 'rgba(244, 67, 54, 0.2)', color: '#fff' }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={loading}
              autoFocus
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(144, 202, 249, 0.8)',
                  },
                },
                '& .MuiOutlinedInput-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
                  opacity: 1,
                },
                '& .MuiInputBase-input': {
                  color: '#fff',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: 'rgba(144, 202, 249, 0.9)',
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(144, 202, 249, 0.8)',
                  },
                },
                '& .MuiOutlinedInput-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
                  opacity: 1,
                },
                '& .MuiInputBase-input': {
                  color: '#fff',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: 'rgba(144, 202, 249, 0.9)',
                  },
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: '1rem',
                textTransform: 'none',
                fontWeight: 600,
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                color: '#fff',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.4)',
                  transform: 'translateY(-2px)',
                },
                '&:active': {
                  transform: 'translateY(0px)',
                },
                '&:disabled': {
                  background: 'rgba(255, 255, 255, 0.15)',
                  opacity: 0.6,
                  cursor: 'not-allowed',
                },
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1, color: '#fff' }} />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
      </Box>
    </>
  );
};
