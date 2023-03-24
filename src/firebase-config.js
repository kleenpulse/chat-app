// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAUN8vsgi-_i3eZAKU7yA1YE1VoVX4TMaE",
    authDomain: "chat-app-9a45f.firebaseapp.com",
    projectId: "chat-app-9a45f",
    storageBucket: "chat-app-9a45f.appspot.com",
    messagingSenderId: "476007683751",
    appId: "1:476007683751:web:bb9b4581990c86aaf0ed82",
    measurementId: "G-FMVMVF4ZXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)