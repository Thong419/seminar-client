// HomePage.tsx
import { Box, Button, Typography } from '@mui/material';
import CSRForm from '../components/CSRForm';
import Instruction from '../components/Instruction';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCreateUser = () => {
      navigate('/create-user');
  }

  return (
    <Box mt={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          🔐 My Internal CA Web
        </Typography>
      </Box>

      <CSRForm />

      <Box mt={4}>
        <Instruction />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Button variant="outlined"  onClick={handleCreateUser}>
          Tạo tài khoản mới
        </Button>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Box>
    </Box>
  );
}
