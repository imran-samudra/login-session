const express = require('express');
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT belum dikonfigurasi.');
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Inisialisasi Firebase Admin
initializeApp({
  credential: cert(serviceAccount)
});

const auth = getAuth();
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
