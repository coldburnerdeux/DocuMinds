// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDiKydx2FPR1AOSTz026fR6b7_SYVaejQ",
  authDomain: "chatverse-1b9bd.firebaseapp.com",
  projectId: "chatverse-1b9bd",
  storageBucket: "chatverse-1b9bd.appspot.com",
  messagingSenderId: "1055061495983",
  appId: "1:1055061495983:web:9d871feb53bf88356f845a",
  measurementId: "G-Z5ZE4Z16HF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export{auth};
export default app;