import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBgyAcgwug27bAySwRsUJbqwd70AzUjDo8",
  authDomain: "gwg-yt.firebaseapp.com",
  projectId: "gwg-yt",
  storageBucket: "gwg-yt.firebasestorage.app",
  messagingSenderId: "977391347390",
  appId: "1:977391347390:web:5fa3974bae60556eac20ef"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export { db, auth, googleProvider };