import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GalleryPage() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get('https://photo-share-backend.onrender.com/upload')
      .then(res => setPhotos(res.data));
  }, []);

  return (
    <div>
      {photos.map((p, i) => (
        <div key={i}>
          <img src={`https://photo-share-backend.onrender.com${p.url}`} width="200" alt="upload" />
          <p>{p.caption} — <em>{p.user}</em></p>
        </div>
      ))}
    </div>
  );
}
