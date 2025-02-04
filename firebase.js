// Import the necessary Firebase functions
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBdItr94RE5XLBTfK_LQrUK0xzQ99mVo_E",
  authDomain: "bullbillion-f5997.firebaseapp.com",
  projectId: "bullbillion-f5997",
  storageBucket: "bullbillion-f5997.firebasestorage.app",
  messagingSenderId: "135105655235",
  appId: "1:135105655235:web:5952cae49f1f5dc3244d76",
  measurementId: "G-9S7FZ7W38V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export the Firebase services
export { auth, db, storage };
