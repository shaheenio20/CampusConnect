// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3thk_a787NfsvOuspQKet9RtJvlI2_dk",
  authDomain: "campusconnect-dbdd6.firebaseapp.com",
  projectId: "campusconnect-dbdd6",
  storageBucket: "campusconnect-dbdd6.firebasestorage.app",
  messagingSenderId: "117513795694",
  appId: "1:117513795694:web:7cab613b275cff87eb0e7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);