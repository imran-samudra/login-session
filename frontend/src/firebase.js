import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Ganti nilai-nilai di bawah dengan config dari Firebase Console milikmu
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAjtwYvjLRo8TZaWHAgTftlZrouts5SM4",
  authDomain: "loginpage-618aa.firebaseapp.com",
  projectId: "loginpage-618aa",
  storageBucket: "loginpage-618aa.firebasestorage.app",
  messagingSenderId: "659630040589",
  appId: "1:659630040589:web:7477b94cb4e49097045744",
  measurementId: "G-WCF55YNHSV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();