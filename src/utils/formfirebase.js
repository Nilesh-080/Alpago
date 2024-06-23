import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBawhbahMqjUVNZxnAyBym9SBm_b7hTnKs",
  authDomain: "alpaago-aa888.firebaseapp.com",
  projectId: "alpaago-aa888",
  storageBucket: "alpaago-aa888.appspot.com",
  messagingSenderId: "1010056850289",
  appId: "1:1010056850289:web:0040b5b4410c3c1d7d64d0",
  measurementId: "G-VNKYBWBY0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getDatabase(app);
export default fireDB