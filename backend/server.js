const express = require('express');
const cors = require('cors');
const { initializeApp, cert, getApp, getApps } = require('firebase-admin/app');
const firebaseAdminAuth = require('firebase-admin/auth');

let firebaseAuth;

const resolveGetAuth = () => {
  const getAuthFunction =
    firebaseAdminAuth?.getAuth ||
    firebaseAdminAuth?.default?.getAuth ||
    (typeof firebaseAdminAuth?.default === 'function' ? firebaseAdminAuth.default : null) ||
    (typeof firebaseAdminAuth === 'function' ? firebaseAdminAuth : null);

  if (typeof getAuthFunction !== 'function') {
    const availableExports = Object.keys(firebaseAdminAuth || {}).join(', ') || 'tidak ada';
    throw new Error(`Firebase Auth API tidak tersedia. Export: ${availableExports}`);
  }

  return getAuthFunction;
};

const getFirebaseAuth = () => {
  if (firebaseAuth) return firebaseAuth;

  const encodedCredentials = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  const rawCredentials = encodedCredentials
    ? Buffer.from(encodedCredentials, 'base64').toString('utf8')
    : process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!rawCredentials) {
    throw new Error('Kredensial Firebase Admin belum dikonfigurasi.');
  }

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(rawCredentials);
  } catch (error) {
    throw new Error('Kredensial Firebase Admin bukan JSON yang valid.');
  }

  const firebaseApp = getApps().length
    ? getApp()
    : initializeApp({ credential: cert(serviceAccount) });
  firebaseAuth = resolveGetAuth()(firebaseApp);
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
    console.error('Verifikasi token Firebase gagal:', error.code || error.message);
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
