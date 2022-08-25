import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL

    // apiKey: "AIzaSyAPBkZ1fqlvEcqWJhVtsmMnaS5UbJ6WGIg",
    // authDomain: "gym-app-c4339.firebaseapp.com",
    // projectId: "gym-app-c4339",
    // storageBucket: "gym-app-c4339.appspot.com",
    // messagingSenderId: "1087843414313",
    // appId: "1:1087843414313:web:fb77fbf79096d49dfd4738",
    // databaseURL: "https://gym-app-c4339-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
const database = getDatabase(app)

export { db, auth, database }