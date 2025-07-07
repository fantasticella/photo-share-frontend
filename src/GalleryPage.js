import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function GalleryPage({ user }) {
  const [photos, setPhotos] = useState([]);

  const loadPhotos = async () => {
    try {
      const res = await axios.get('https://photo-share-backend.onrender.com/upload', {
        withCredentials: true
      });
      setPhotos(res.data);
    } catch (err) {
      console.error('Failed to load gallery:', err);
    }
  };

  const deletePhoto = async (url) => {
    try {
      await axios.post(
        'https://photo-share-backend.onrender.com/upload/delete',
        { url },
        { withCredentials: true }
      );
      setPhotos((prev) => prev.filter((p) => p.url !== url));
    } catch (err) {
      alert('Failed to delete photo');
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📸 Shared Gallery</h2>
      <Link to="/upload">➕ Upload Photo</Link>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          marginTop: '20px',
          justifyContent: 'center'
        }}
      >
        {photos.map((p, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #ccc',
              borderRadius: 10,
              padding: 10,
              width: 220,
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          >
            <img
              src={p.url.startsWith('http') ? p.url : `https://photo-share-backend.onrender.com${p.url}`}
              alt={p.caption}
              style={{ width: '100%', borderRadius: 5 }}
            />
            <p style={{ marginTop: 8, fontWeight: 'bold' }}>{p.caption}</p>
            <p style={{ fontSize: 12, color: '#555' }}>— {p.user}</p>
            {user === p.user && (
              <button
                onClick={() => deletePhoto(p.url)}
                style={{
                  marginTop: 10,
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: 5,
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
