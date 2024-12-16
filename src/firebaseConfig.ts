import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCcpQHFdlPThExxAS2jPgzww2h4RP2yamY",
  authDomain: "esp32-f0f56.firebaseapp.com",
  databaseURL: "https://esp32-f0f56-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp32-f0f56",
  storageBucket: "esp32-f0f56.firebasestorage.app",
  messagingSenderId: "105447309811",
  appId: "1:105447309811:web:99ebe5ea2f5c7b3905d286",
  measurementId: "G-FC87TMHNGJ",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
