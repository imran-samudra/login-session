import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const GoogleIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true" className="google-icon"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.4Z"/><path fill="#34A853" d="M12 22c2.7 0 4.98-.9 6.63-2.37l-3.24-2.54c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.39 13.92A6.02 6.02 0 0 1 6.08 12c0-.67.12-1.32.31-1.92V7.46H3.04A10 10 0 0 0 2 12c0 1.62.39 3.15 1.04 4.54l3.35-2.62Z"/><path fill="#EA4335" d="M12 5.95c1.47 0 2.79.5 3.82 1.5l2.88-2.88A9.65 9.65 0 0 0 12 2a10 10 0 0 0-8.96 5.46l3.35 2.62C7.18 7.71 9.39 5.95 12 5.95Z"/></svg>;

const AuthCard = ({ onLogin, onRegister, onGoogleLogin, actionLoading, error, clearError }) => {
  const [isLogin, setIsLogin] = useState(true);
  const switchMode = () => { clearError(); setIsLogin((value) => !value); };
  return <div className="auth-card">
    <div className="mobile-brand"><span className="brand-mark">N</span><span>Nexora</span></div>
    <header className="auth-header"><span className="eyebrow">{isLogin ? '' : ''}</span><h2>{isLogin ? 'Masuk ke akunmu' : 'Buat akun baru'}</h2><p>{isLogin ? 'Masukkan detail akun untuk melanjutkan.' : ''}</p></header>
    {error && <div className="alert" role="alert"><span>!</span>{error}</div>}
    {isLogin ? <LoginForm onLogin={onLogin} isLoading={actionLoading}/> : <RegisterForm onRegister={onRegister} isLoading={actionLoading}/>} 
    <div className="divider"><span>atau lanjutkan dengan</span></div>
    <button type="button" className="btn btn-google" onClick={onGoogleLogin} disabled={actionLoading}><GoogleIcon/> Google</button>
    <p className="toggle-link">{isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}<button type="button" className="text-button" onClick={switchMode} disabled={actionLoading}>{isLogin ? 'Daftar sekarang' : 'Masuk di sini'}</button></p>
  </div>;
};
export default AuthCard;
