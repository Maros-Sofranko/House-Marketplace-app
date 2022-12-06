import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_dvLk4XVVBklnZf7P2XOerHSFX-Yxzwo",
  authDomain: "house-marketplace-app-bebc1.firebaseapp.com",
  projectId: "house-marketplace-app-bebc1",
  storageBucket: "house-marketplace-app-bebc1.appspot.com",
  messagingSenderId: "67346753396",
  appId: "1:67346753396:web:3587af975874496d276e21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();