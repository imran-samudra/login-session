import { useEffect, useState } from 'react';
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
        if (!response.ok) throw new Error('Request gagal');
        const data = await response.json();
        setBackendMessage(data.message || 'Sesi berhasil diverifikasi.');
      } catch (error) {
        if (error.name !== 'AbortError') setBackendMessage('Akun berhasil masuk. Backend belum dapat dihubungi.');
      } finally { if (!controller.signal.aborted) setLoading(false); }
    };
    load(); return () => controller.abort();
  }, [user]);

  const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
  return <div className="dashboard">
    <header className="dashboard-nav"><div className="brand dashboard-brand"></div><button className="logout-button" onClick={onLogout} disabled={isLoading}><span>↗</span>{isLoading ? 'Keluar...' : 'Keluar'}</button></header>
    <div className="dashboard-body"><span className="success-badge">✓ Login berhasil</span><div className="profile-avatar">{user.photoURL ? <img src={user.photoURL} alt="Foto profil"/> : initial}</div><p className="welcome-label">Selamat datang,</p><h1>{user.displayName }</h1><p className="user-email">{user.email}</p><div className="session-card"><span className={`status-dot ${loading ? 'pulse' : ''}`}/><div><strong>{loading ? 'Loading...' : 'Berhasil Login'}</strong></div></div></div>
  </div>;
};
export default Dashboard;
