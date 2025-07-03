import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function GalleryPage() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const res = await axios.get('https://photo-share-backend.onrender.com/upload/all', { withCredentials: true });
        setPhotos(res.data);
      } catch (err) {
        console.error('Failed to load gallery:', err);
      }
    };

    loadPhotos();
  }, []);

  return (
    <div>
      <h2>📸 Shared Gallery</h2>
      <Link to="/upload">Upload Photo</Link>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
        {photos.map((p, i) => (
          <div key={i} style={{ border: '1px solid #ccc', padding: 10, borderRadius: 5 }}>
            <img
              src={`https://photo-share-backend.onrender.com${p.url}`}
              alt={p.caption}
              style={{ width: 200, height: 'auto', display: 'block' }}
            />
            <p><strong>{p.user}</strong>: {p.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
