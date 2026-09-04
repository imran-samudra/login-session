import { useState } from 'react';

const RegisterForm = ({ onRegister, isLoading }) => {
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [confirmPassword, setConfirmPassword] = useState(''); const [passwordError, setPasswordError] = useState('');
  const submit = (event) => { event.preventDefault(); if (password !== confirmPassword) { setPasswordError('Konfirmasi kata sandi belum sama.'); return; } setPasswordError(''); onRegister(name, email.trim(), password); };
  return <form onSubmit={submit} className="auth-form">
    <label className="form-group"><span>Nama lengkap</span><input type="text" placeholder="Nama kamu" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required/></label>
    <label className="form-group"><span>Email</span><input type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required/></label>
    <div className="form-row"><label className="form-group"><span>Kata sandi</span><input type="password" placeholder="Min. 6 karakter" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" minLength="6" required/></label><label className="form-group"><span>Konfirmasi</span><input type="password" placeholder="Ulangi sandi" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" minLength="6" required/></label></div>
    {passwordError && <p className="field-error" role="alert">{passwordError}</p>}
    <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? <><span className="button-spinner"/>Memproses...</> : <>Buat akun <span>→</span></>}</button>
  </form>;
};
export default RegisterForm;
