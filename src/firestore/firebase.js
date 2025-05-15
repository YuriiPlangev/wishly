import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBWVBC9Y9ym1ClmCkTIJocQPS-UfI_g2mw",
  authDomain: "whishlists-841ba.firebaseapp.com",
  projectId: "whishlists-841ba",
  storageBucket: "whishlists-841ba.firebasestorage.app",
  messagingSenderId: "580353187978",
  appId: "1:580353187978:web:a5fa8b2e40893e11570d73",
  measurementId: "G-LT2VREK6WX"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)