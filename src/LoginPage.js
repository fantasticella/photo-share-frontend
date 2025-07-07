import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const postRes = await axios.post(
        'api/auth/login',
        { username, password },
        { withCredentials: true }
      );
      console.log('🟢 Login POST successful:', postRes.data);

      const getRes = await axios.get(
        'api/auth/me',
        { withCredentials: true }
      );
      console.log('🟢 /auth/me response:', getRes.data);

      if (getRes.data.user) {
        setUser(getRes.data.user);
        navigate('/gallery'); // 🔁 Redirect after login
      } else {
        alert('Login failed — no session found.');
      }
    } catch (err) {
      console.error('🔴 Login failed:', err);
      alert('Login failed');
    }
  };

  return (
    <div>
      <input
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
        value={username}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}
