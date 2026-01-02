import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lightTheme, darkTheme } from './theme/themes';
import { useAppSelector } from './store/store';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

function App() {
  const isDarkMode = useAppSelector((state) => state.app.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Main Layout with Header + Drawer */}
            <Route
              path="/"
              element={
                <Home />
                // <ProtectedRoute>
                //   <Home />
                // </ProtectedRoute>
              }
            >
              {/* Nested routes rendered in <Outlet /> */}
              {/* <Route index element={<Navigate to="/projects" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route
                path="projects/:projectId"
                element={
                  <ProtectedRoute>
                    <ProjectFlows />
                  </ProtectedRoute>
                }
              /> */}
            </Route>

            {/* <Route
              path="/flow/:id"
              element={
                <ProtectedRoute>
                  <Flow />
                </ProtectedRoute>
              }
            /> */}
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;

