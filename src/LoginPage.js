import { useState } from 'react';
import axios from 'axios';

export default function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      await axios.post('https://photo-share-backend.onrender.com/auth/login', { username, password }, { withCredentials: true });
      const res = await axios.get('https://photo-share-backend.onrender.com/auth/me', { withCredentials: true });
      setUser(res.data.user);
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
