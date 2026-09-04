import { useAuth } from './hooks/useAuth';
import AuthCard from './components/AuthCard';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const auth = useAuth();
  if (auth.authLoading) return <main className="app-shell loading-screen" aria-live="polite"><div className="brand-mark">N</div><div className="spinner"/><p>Menyiapkan ruangmu...</p></main>;

  return (
    <main className="app-shell">
      <div className="orb orb-one"/><div className="orb orb-two"/>
      <section className={`auth-layout ${auth.currentUser ? 'dashboard-layout' : ''}`}>
        {!auth.currentUser && <aside className="welcome-panel">
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
