import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6bgVSs5TtZM-A7VGb39kE2sYC2YUtjGM",
  authDomain: "gurman-57941.firebaseapp.com",
  projectId: "gurman-57941",
  storageBucket: "gurman-57941.appspot.com",
  messagingSenderId: "649877108234",
  appId: "1:649877108234:web:b0ffed108f9d85e93a11f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
