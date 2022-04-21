import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCnl5hv979I79nvj8DYAa1jgoAjDohsFh0",
    authDomain: "bendu-7a0da.firebaseapp.com",
    projectId: "bendu-7a0da",
    storageBucket: "bendu-7a0da.appspot.com",
    messagingSenderId: "908568165342",
    appId: "1:908568165342:web:3c8b75575d0a86a00ebb4f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);