const express = require('express');
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

let firebaseAuth;

const getFirebaseAuth = () => {
  if (firebaseAuth) return firebaseAuth;

  const rawCredentials = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!rawCredentials) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT belum dikonfigurasi.');
  }

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(rawCredentials);
  } catch (error) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT bukan JSON yang valid.');
  }

  const firebaseApp = initializeApp({ credential: cert(serviceAccount) });
  firebaseAuth = getAuth(firebaseApp);
  return firebaseAuth;
};
const app = express();
app.use(cors());
app.use(express.json());

// Middleware verifikasi token
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ditemukan.' });
  }

  const token = authHeader.split(' ')[1];
  let auth;
  try {
    auth = getFirebaseAuth();
  } catch (error) {
    console.error('Firebase Admin gagal dikonfigurasi:', error.message);
    return res.status(503).json({ message: 'Konfigurasi Firebase Admin belum valid.' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token tidak valid atau kedaluwarsa.' });
  }
};

// Endpoint uji coba privat
app.get('/api/dashboard', verifyToken, (req, res) => {
  res.json({
    message: 'Halo! Token kamu valid diverifikasi oleh Node.js.',
    user: req.user
  });
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Backend aktif di http://localhost:${PORT}`);
  });
}

module.exports = app;
