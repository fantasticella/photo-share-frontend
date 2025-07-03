import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import UploadPage from './UploadPage';
import GalleryPage from './GalleryPage';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // wait for session check

  // Check if session exists on load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get('https://photo-share-backend.onrender.com/auth/me', { withCredentials: true });
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const RequireAuth = ({ children }) => {
    if (loading) return <p>Loading...</p>; // don't flash routes before we know
    return user ? children : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage setUser={setUser} />} />
        <Route
          path="/upload"
          element={
            <RequireAuth>
              <UploadPage />
            </RequireAuth>
          }
        />
        <Route
          path="/gallery"
          element={
            <RequireAuth>
              <GalleryPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
