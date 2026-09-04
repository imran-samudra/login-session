import { useState } from 'react';

const LoginForm = ({ onLogin, isLoading }) => {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [showPassword, setShowPassword] = useState(false);
  const submit = (event) => { event.preventDefault(); onLogin(email.trim(), password); };
  return <form onSubmit={submit} className="auth-form">
    <label className="form-group"><span>Email</span><input type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required/></label>
    <label className="form-group"><span>Kata sandi</span><div className="password-field"><input type={showPassword ? 'text' : 'password'} placeholder="Masukkan kata sandi" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" minLength="6" required/><button type="button" className="password-toggle" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}>{showPassword ? 'Sembunyikan' : 'Lihat'}</button></div></label>
    <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? <><span className="button-spinner"/>Memproses...</> : <>Masuk <span>→</span></>}</button>
  </form>;
};
export default LoginForm;
