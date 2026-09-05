import { useEffect, useState } from 'react';
import BrandLogo from './BrandLogo';
import './Dashboard.css';

const Dashboard = ({ user, onLogout, isLoading }) => {
  const [backendMessage, setBackendMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const token = await user.getIdToken();
        const response = await fetch('/api/dashboard', { headers: { Authorization: `Bearer ${token}` }, signal: controller.signal });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Request backend gagal.');
        setBackendMessage(data.message || 'Sesi berhasil diverifikasi.');
      } catch (error) {
        if (error.name !== 'AbortError') setBackendMessage(error.message || 'Backend belum dapat dihubungi.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [user]);

  const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
  return <div className="dashboard">
    <header className="dashboard-nav">
      <BrandLogo/>
      <button className="logout-button" onClick={onLogout} disabled={isLoading}><span aria-hidden="true">↗</span>{isLoading ? 'Keluar...' : 'Keluar'}</button>
    </header>
    <div className="dashboard-body">
      <span className="success-badge">✓ Login berhasil</span>
      <div className="profile-avatar">{user.photoURL ? <img src={user.photoURL} alt="Foto profil"/> : initial}</div>
      <p className="welcome-label">Selamat datang di Ritelio,</p>
      <h1>{user.displayName || 'Pengguna'}</h1>
      <p></p>
      <div className="session-card"><span className={`status-dot ${loading ? 'pulse' : ''}`}/><div><strong>{loading ? 'Memeriksa sesi...' : 'Sesi aktif'}</strong><p className="user-email">{user.email}</p></div></div>
    </div>
  </div>;
};
export default Dashboard;
