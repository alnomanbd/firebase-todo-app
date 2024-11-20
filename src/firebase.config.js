// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3_oBIR8pJE63rp_SqWbBx-3q2V4GMODg",
  authDomain: "todo-app-afb5d.firebaseapp.com",
  projectId: "todo-app-afb5d",
  storageBucket: "todo-app-afb5d.firebasestorage.app",
  messagingSenderId: "980696850220",
  appId: "1:980696850220:web:3a0fb3834e78e9bbe51689"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)