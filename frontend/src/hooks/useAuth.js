import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const messages = {
  'auth/email-already-in-use': 'Email ini sudah terdaftar. Silakan masuk.',
  'auth/invalid-credential': 'Email atau kata sandi tidak sesuai.',
  'auth/invalid-email': 'Format email belum benar.',
  'auth/weak-password': 'Kata sandi minimal terdiri dari 6 karakter.',
  'auth/popup-closed-by-user': 'Jendela masuk Google ditutup sebelum selesai.',
  'auth/popup-blocked': 'Popup Google diblokir browser. Izinkan popup lalu coba lagi.',
  'auth/network-request-failed': 'Koneksi bermasalah. Periksa internet lalu coba lagi.',
  'auth/too-many-requests': 'Terlalu banyak percobaan. Silakan coba kembali nanti.',
};

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
    setAuthLoading(false);
  }), []);

  const run = async (action) => {
    setError('');
    setActionLoading(true);
    try { await action(); return true; }
    catch (err) { setError(messages[err?.code] || 'Terjadi kendala. Silakan coba kembali.'); return false; }
    finally { setActionLoading(false); }
  };

  const register = (name, email, password) => run(async () => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: name.trim() });
    setCurrentUser(credential.user);
  });

  return {
    currentUser, authLoading, actionLoading, error,
    register,
    login: (email, password) => run(() => signInWithEmailAndPassword(auth, email, password)),
    loginWithGoogle: () => run(() => signInWithPopup(auth, googleProvider)),
    logout: () => run(() => signOut(auth)),
    clearError: () => setError(''),
  };
};
