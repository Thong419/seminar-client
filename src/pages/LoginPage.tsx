// pages/LoginPage.tsx
import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { loginUser } from '../api'; // <-- import hàm từ api.ts

interface LoginPageProps {
  onLoginSuccess: (token: string) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    try {
      const data = await loginUser(username, password);
      onLoginSuccess(data.token);
    } catch (err) {
      setErrorMsg('Đăng nhập thất bại. Kiểm tra lại thông tin.');
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h5" fontWeight="bold" mb={2}>Đăng nhập</Typography>
      {errorMsg && (
        <Typography color="error" mb={2}>{errorMsg}</Typography>
      )}
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
        Đăng nhập
      </Button>
    </Box>
  );
}
