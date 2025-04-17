// pages/CreateUserPage.tsx
import {
    Box,
    Button,
    TextField,
    Typography,
    MenuItem,
    Alert,
  } from '@mui/material';
  import { useState } from 'react';
  import { registerUser } from '../api'; // Import API
import { useNavigate } from 'react-router-dom';
  
  
  export default function CreateUserPage() {
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const navigate = useNavigate();
  

    const handleCreate = async () => {
      try {
        await registerUser(username, displayName, password, role);
        setSuccessMsg('Tạo tài khoản thành công!');
        // Navigate to login page
        navigate('/login');
      } catch (err) {
        setErrorMsg('Tạo tài khoản thất bại. Có thể tên đã tồn tại hoặc bạn không có quyền.');
      }
    };
    
    return (
      <Box maxWidth={400} mx="auto" mt={5}>
        <Typography variant="h6" gutterBottom>
          👤 Tạo tài khoản mới
        </Typography>
  
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        {successMsg && <Alert severity="success">{successMsg}</Alert>}
  
        <TextField
          fullWidth
          label="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
  
        <TextField
          fullWidth
          label="Tên hiển thị"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          margin="normal"
        />
  
        <TextField
          fullWidth
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
  
        <Box mt={2}>
          <Button fullWidth variant="contained" onClick={handleCreate}>
            Tạo tài khoản
          </Button>
        </Box>
      </Box>
    );
  }
  