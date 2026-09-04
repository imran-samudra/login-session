import { useAuth } from './hooks/useAuth';
import AuthCard from './components/AuthCard';
import Dashboard from './components/Dashboard';
import BrandLogo from './components/BrandLogo';
import './App.css';

function App() {
  const auth = useAuth();
  if (auth.authLoading) return <main className="app-shell loading-screen" aria-live="polite"><BrandLogo compact/><div className="spinner"/><p>Menyiapkan Ritelio...</p></main>;

  return (
    <main className="app-shell">
      <div className="orb orb-one"/><div className="orb orb-two"/>
      <section className={`auth-layout ${auth.currentUser ? 'dashboard-layout' : ''}`}>
        {!auth.currentUser && <aside className="welcome-panel">
          <BrandLogo light/>
          <div className="welcome-copy">
            <span className="eyebrow">Kelola toko lebih cerdas</span>
            <h1>Satu kendali untuk seluruh aktivitas tokomu.</h1>
            <p>Pantau penjualan, kelola stok, dan dapatkan laporan toko secara praktis dalam satu aplikasi.</p>
            <div className="feature-row"><span>Penjualan</span><span>Stok</span><span>Laporan</span></div>
          </div>
          <p className="panel-quote">Retail management made simple.</p>
        </aside>}
        <div className="content-panel">
          {auth.currentUser ? <Dashboard user={auth.currentUser} onLogout={auth.logout} isLoading={auth.actionLoading}/>
            : <AuthCard onLogin={auth.login} onRegister={auth.register} onGoogleLogin={auth.loginWithGoogle} actionLoading={auth.actionLoading} error={auth.error} clearError={auth.clearError}/>} 
        </div>
      </section>
    </main>
  );
}
export default App;
