// App.tsx
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateUserPage from './pages/CreateUserPage';

function App() {
  const handleLoginSuccess = (receivedToken: string) => {
    localStorage.setItem('token', receivedToken);
    // Redirect to home page after successful login
    window.location.href = '/';
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="xl" sx={{ padding: 2 }}>
          <Routes>
          <Route
              path="/"
              element={ <HomePage /> }
            />
            <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

             <Route path="/create-user" element={<CreateUserPage /> } />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
