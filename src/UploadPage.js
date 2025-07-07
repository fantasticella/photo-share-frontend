import { useState } from 'react';
import axios from 'axios';

export default function UploadPage() {
  const [file, setFile] = useState();
  const [caption, setCaption] = useState('');

  const upload = async () => {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('caption', caption);

    await axios.post('/api/upload', formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert('Uploaded!');
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <input placeholder="Caption" onChange={e => setCaption(e.target.value)} />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
