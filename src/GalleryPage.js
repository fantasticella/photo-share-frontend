import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function GalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        // 1. Get current user
        const authRes = await axios.get('/api/auth/me', {
          withCredentials: true
        });
        setCurrentUser(authRes.data.user);

        // 2. Load photos
        const res = await axios.get('/api/upload', {
          withCredentials: true
        });
        setPhotos(res.data);
      } catch (err) {
        console.error('Failed to load gallery or user:', err);
      }
    };

    load();
  }, []);

  const deletePhoto = async (url) => {
    try {
      await axios.post(
        '/api/upload/delete',
        { url },
        { withCredentials: true }
      );
      setPhotos(prev => prev.filter(p => p.url !== url));
    } catch (err) {
      alert('❌ Failed to delete photo.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📸 Shared Gallery</h2>
      <Link to="/upload">Upload Photo</Link>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        marginTop: '20px',
        justifyContent: 'center'
      }}>
        {photos.map((p, i) => (
          <div key={i} style={{
            border: '1px solid #ccc',
            padding: 10,
            borderRadius: 8,
            width: 220,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            position: 'relative'
          }}>
            <img
              src={p.url}
              alt={p.caption}
              style={{ width: '100%', height: 'auto', borderRadius: 4 }}
            />
            <p style={{ marginTop: 8 }}><strong>{p.caption}</strong></p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>— {p.user}</p>

            <button
              onClick={() => deletePhoto(p.url)}
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                background: '#ff5c5c',
                color: 'white',
                border: 'none',
                padding: '4px 8px',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
